import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./components/ProductDescriptionPage/ProductDescriptionPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import { getProductFromCartByProduct } from "./utils";
import { client } from "./index";
import { getProductsByCategory, getCategories, getCurrencies } from "./queries";
import "./App.css";

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
        const result = await client.query({
            query: getCategories,
        });

        const categories = await result.data.categories;
        this.setState({ categories: categories });
    };

    fetchStoreItems = async (category) => {
        const result = await client.query({
            query: getProductsByCategory,
            variables: {
                title: category,
            },
        });

        const items = await result.data.category.products;
        this.setState({ storeItems: items });
    };

    fetchCurrencies = async () => {
        const result = await client.query({ query: getCurrencies });
        const currencies = await result.data.currencies;
        this.setState({ currencies: currencies });
    };

    componentDidMount() {
        this.fetchCategories();
        this.fetchStoreItems(this.state.currentCategory);
        this.fetchCurrencies();
    }

    /* CART LOGIC  */

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
        /*
            productAlreadyInCart would be a product that has the same id (i.e: "ps-5")
            and that has the same attributes selected as the product I'm trying to add to the cart (if it has them)
            because I should be able to buy a black ps5 for me and a white one for my brother 
            on the same buy :)
        */

        if (productAlreadyInCart) {
            //If there's already a product with these attributes, update it's quantity
            updatedProductList = this.updateCartQuantity(
                "add",
                productAlreadyInCart,
                selectedAttributes
            );
        } else {
            //Create a productClone that let's me update it
            let modifiedProduct = JSON.parse(JSON.stringify(product));
            let clone;

            for (let i = 0; i < product?.attributes?.length; i++) {
                //Find the attributes that I selected
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

                        clone.isSelected = true; // add this marker so that it's easier to render later
                        modifiedProduct.attributes[i].items[j] = {
                            ...clone,
                        };
                    }
                }
            }
            updatedProductList = [
                ...this.state.cartItems,
                {
                    ...modifiedProduct, //updated product with the isSelected marker
                    selectedAttributes, //array of selectedAttributes to make this object easier to filter by id && selectedAttributes
                    quantity: 1,
                },
            ];
        }
        this.setState({ cartItems: updatedProductList });
    };

    handleRemoveProduct = (product, selectedAttributes) => {
        let updatedProductList;

        let productAlreadyInCart = getProductFromCartByProduct(
            this.state.cartItems,
            product,
            selectedAttributes
        );

        if (productAlreadyInCart.quantity > 1) {
            updatedProductList = this.updateCartQuantity(
                "subtract",
                productAlreadyInCart,
                selectedAttributes
            );
        } else {
            const products = [...this.state.cartItems];
            const indexOfProduct = products.indexOf(productAlreadyInCart);
            products.splice(indexOfProduct, 1);
            updatedProductList = products;
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
            storeItems,
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
                        handleAddProduct={this.handleAddProduct}
                        handleRemoveProduct={this.handleRemoveProduct}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProductListingPage
                                    storeItems={storeItems}
                                    currentCategory={currentCategory}
                                    selectedCurrency={selectedCurrency}
                                    handleAddProduct={this.handleAddProduct}
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
                        <Route
                            path="/cart"
                            element={
                                <Cart
                                    cartItems={cartItems}
                                    handleAddProduct={this.handleAddProduct}
                                    handleRemoveProduct={
                                        this.handleRemoveProduct
                                    }
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
