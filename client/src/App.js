import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./components/ProductDescriptionPage/ProductDescriptionPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import { getPrice, getProductFromCart, taxes } from "./utils";
import { client } from "./index";
import { getProductsByCategory, getCategories, getCurrencies } from "./queries";
import "./App.css";
import StoreContext, {StoreProvider} from "./Context/StoreContext";

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
            amountOfItems: 0,
            total: 0,
            tax: 0, //The default taxes are $15,
            //it's not clear to me if I should make the conversion to another currency or not
            //So I'll do it anyways, but I will not add it to the total
            //because it's kept separated in Figma
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
        this.calculateAmountOfItems = this.calculateAmountOfItems.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
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

    calculateAmountOfItems = (cartItems) => {
        let initialValue = 0;
        for (let item of cartItems) {
            initialValue += item.quantity;
        }

        this.setState({ amountOfItems: initialValue });
    };

    getTotalPrice = (selectedCurrency, cart) => {
        let totalPrice = 0;

        for (let item of cart) {
            const correctPrice = getPrice(item.prices, selectedCurrency);
            totalPrice += correctPrice.amount * item.quantity;
        }

        totalPrice = parseFloat(totalPrice.toFixed(2));
        this.setState({ total: totalPrice });
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
        const { selectedCurrency, cartItems, amountOfItems, currentCategory } =
            this.state;
        this.fetchCategories();
        this.fetchStoreItems(currentCategory);
        this.fetchCurrencies();

        const data = localStorage.getItem("products");
        if (data) {
            this.setState({ cartItems: JSON.parse(data) });
        }

        this.calculateAmountOfItems(cartItems);
        this.getTotalPrice(selectedCurrency, cartItems, amountOfItems);
        this.setState({ tax: getPrice(taxes, selectedCurrency) });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { cartItems, selectedCurrency, amountOfItems } = this.state;
        if (cartItems !== nextState.cartItems) {
            this.calculateAmountOfItems(nextState.cartItems);
        }
        if (
            cartItems !== nextState.cartItems ||
            selectedCurrency !== nextState.selectedCurrency ||
            amountOfItems !== nextState.amountOfItems
        ) {
            this.getTotalPrice(
                nextState.selectedCurrency,
                nextState.cartItems,
                nextState.amountOfItems
            );
        }
        if (selectedCurrency !== nextState.selectedCurrency) {
            this.setState({
                tax: getPrice(taxes, nextState.selectedCurrency),
            });
        }

        return true;
    }

    /* CART LOGIC  */

    /**
     * Find the product index, update its quantity
     * @param {string} operation Add or delete product
     * @param {object} product Product I want to update
     * @param {array} selectedAttributes Attributes of said product
     * @returns Updated cart array
     */
    updateCartQuantity(operation, product, selectedAttributes) {
        const item = getProductFromCart(
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

    /**
     * @summary check if a product like this one exists in cart, if it does, update quantity, if it doesn't, add it
     * productAlreadyInCart is a product with the same id and selectedAttributes as the ones I'm passing to this function.
     * If this product is already in my cart, increase its quantity.
     * If it doesn't exist, add it to my cart and use selectedAttributes to add a marker (isSelected = true) to make it easier to render.
     * @param {object} product Product I want to update
     * @param {array} selectedAttributes Attributes of said product (selected by user)
     */
    handleAddProduct = (product, selectedAttributes) => {
        let updatedProductList;
        let productAlreadyInCart = getProductFromCart(
            this.state.cartItems,
            product,
            selectedAttributes
        );
        if (productAlreadyInCart) {
            updatedProductList = this.updateCartQuantity(
                "add",
                productAlreadyInCart,
                selectedAttributes
            );
        } else {
            //Make a deep clone of product that I can edit
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

                        clone.isSelected = true;
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
        localStorage.setItem("products", JSON.stringify(updatedProductList));
    };

    /**
     * Inverse of handleAddProduct
     * @param {object} product Product I want to update
     * @param {array} selectedAttributes Attributes of said product
     */
    handleRemoveProduct = (product, selectedAttributes) => {
        let updatedProductList;

        let productAlreadyInCart = getProductFromCart(
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
        localStorage.setItem("products", JSON.stringify(updatedProductList));
    };

    render() {
        const {
            categories,
            currentCategory,
            selectedCurrency,
            currencies,
            cartItems,
            storeItems,
            amountOfItems,
            total,
            tax,
        } = this.state;
        return (
            <div className="App">
                <BrowserRouter>
                    <StoreProvider>
                        <Header
                            currentCategory={currentCategory}
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
                            amountOfItems={amountOfItems}
                            total={total}
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
                                        selectedCurrency={selectedCurrency}
                                        amountOfItems={amountOfItems}
                                        total={total}
                                        tax={tax}
                                    />
                                }
                            />
                        </Routes>
                    </StoreProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
