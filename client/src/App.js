import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "./index";
import { getProductsByCategory, getCategories, getCurrencies } from "./queries";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./components/ProductDescriptionPage/ProductDescriptionPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import "./App.css";
import { getProductFromCartByProduct } from "./aux";

class App extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            currentCategory: "all",
            currencies: [],
            selectedCurrency: "$",
            cartItems: [],
            storeItems: [],
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSelectedCurrencyChange =
            this.handleSelectedCurrencyChange.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchStoreItems = this.fetchStoreItems.bind(this);
        this.fetchCurrencies = this.fetchCurrencies.bind(this);
        this.handleQuickAdd = this.handleQuickAdd.bind(this);
        this.updateCartQuantity = this.updateCartQuantity.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    /* MAKING THE STORE DYNAMIC */

    handleCategoryChange = (newCategory) => {
        this.setState({ currentCategory: newCategory });
        this.fetchStoreItems(newCategory);
    };

    handleSelectedCurrencyChange = (newSelectedCurrency) => {
        this.setState({
            selectedCurrency: newSelectedCurrency,
        });
    };

    /* INITIALIZING STORE  */
    fetchCategories = async () => {
        await client
            .query({
                query: getCategories,
            })
            .then((result) => {
                const categories = result.data.categories;
                this.setState({ categories: categories });
            });
    };

    fetchStoreItems = async (category) => {
        await client
            .query({
                query: getProductsByCategory,
                variables: {
                    title: category,
                },
            })
            .then((result) => {
                const items = result.data.category.products;
                this.setState({ storeItems: items });
            });
    };

    fetchCurrencies = async () => {
        await client
            .query({ query: getCurrencies })
            .then((result) =>
                this.setState({ currencies: result.data.currencies })
            );
    };

    componentDidMount() {
        this.fetchCategories();
        this.fetchStoreItems(this.state.currentCategory);
        this.fetchCurrencies();
    }

    /* CART LOGIC  */

    handleQuickAdd = (product) => {
        let updatedProductList;

        let productAlreadyInCart = getProductFromCartByProduct(
            this.state.cartItems,
            product
        );

        if (productAlreadyInCart) {
            const indexOfProduct =
                this.state.cartItems.indexOf(productAlreadyInCart);
            const products = [...this.state.cartItems];

            products[indexOfProduct].quantity += 1;
            return products;
        } else {
            updatedProductList = [
                ...this.state.cartItems,
                {
                    ...product,
                    selectedAttributes: [],
                    quantity: 1,
                },
            ];
        }
        this.setState({ cartItems: updatedProductList });
    };

    updateCartQuantity(operation, product, selectedAttributes) {
        const item = getProductFromCartByProduct(
            this.state.cartItems,
            product,
            selectedAttributes
        );

        const indexOfProduct = this.state.cartItems.indexOf(item);

        const products = [...this.state.cartItems];

        if (operation === "add") {
            products[indexOfProduct].quantity += 1;
        } else {
            products[indexOfProduct].quantity -= 1;
        }

        return products;
    }

    handleAddProduct = (product, selectedAttributes) => {
        let updatedProductList;
        let productAlreadyInCart = getProductFromCartByProduct(
            this.state.cartItems,
            product,
            selectedAttributes
        );

        if (productAlreadyInCart) {
            //If this product already exists in the cart
            //Check that the objects in both attributes array are the same
            //(If I want to buy a blue and a white iPhone on the same session, I should be able to do that)
            updatedProductList = this.updateCartQuantity(
                "add",
                productAlreadyInCart,
                selectedAttributes
            );
        } else {
            let modifiedProduct = JSON.parse(JSON.stringify(product));
            let clone;

            for (let i = 0; i < product?.attributes?.length; i++) {
                for (
                    let j = 0;
                    j < product?.attributes[i]?.items?.length;
                    j++
                ) {
                    if (
                        product.attributes[i].items[j].value ===
                        selectedAttributes[i].value
                    ) {
                        clone = {
                            ...product.attributes[i].items[j],
                        };

                        clone.isSelected = true; // this works
                        modifiedProduct.attributes[i].items[j] = {
                            ...clone,
                        };
                    }
                }
            }
            updatedProductList = [
                ...this.state.cartItems,
                {
                    ...modifiedProduct,
                    selectedAttributes,
                    quantity: 1,
                },
            ];
        }
        this.setState({ cartItems: updatedProductList });
    };

    handleRemoveProduct = (product) => {
        let updatedProductList;

        if (this.getProductFromCart(product).quantity > 1) {
            updatedProductList = this.updateCartQuantity("substract", product);
        } else {
            updatedProductList = this.state.cartItems.filter(
                (item) => item.id === product.id
            );
        }

        this.setState({ cartItems: updatedProductList });
    };

    render() {
        const {
            categories,
            currentCategory,
            selectedCurrency,
            currencies,
            cartItems,
        } = this.state;
        return (
            <div className="App">
                <BrowserRouter>
                    <Header
                        categories={categories}
                        handleCategoryChange={this.handleCategoryChange}
                        selectedCurrency={selectedCurrency}
                        currencies={currencies}
                        handleSelectedCurrencyChange={
                            this.handleSelectedCurrencyChange
                        }
                        cartItems={cartItems}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProductListingPage
                                    storeItems={this.state.storeItems}
                                    currentCategory={currentCategory}
                                    selectedCurrency={selectedCurrency}
                                    cartItems={cartItems}
                                    handleAddProduct={this.handleAddProduct}
                                    handleQuickAdd={this.handleQuickAdd}
                                />
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <ProductDescriptionPage
                                    selectedCurrency={selectedCurrency}
                                    handleAddProduct={this.handleAddProduct}
                                />
                            }
                        />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
