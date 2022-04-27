import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "./index";
import { getProductsByCategory, getCategories, getCurrencies } from "./queries";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./components/ProductDescriptionPage/ProductDescriptionPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
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

        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchStoreItems = this.fetchStoreItems.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.fetchCurrencies = this.fetchCurrencies.bind(this);
        this.handleSelectedCurrencyChange =
            this.handleSelectedCurrencyChange.bind(this);
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
    getProductFromCart(product) {
        return this.state.cartItems.find((item) => item.id === product.id);
    }

    updateCartQuantity(operation, product) {
        const indexOfProduct = this.state.cartItems.findIndex(
            (item) => item.id === product.id
        );

        const products = [...this.state.cartItems];

        if (operation === "add") {
            products[indexOfProduct].quantity += 1;
        } else {
            products[indexOfProduct].quantity -= 1;
        }

        return products;
    }

    handleAddProduct = (product) => {
        let updatedProductList;

        if (this.getProductFromCart(product)) {
            updatedProductList = this.updateCartQuantity("add", product);
        } else {
            //I also have to add the selectedProperties to this object
            //
            updatedProductList = [
                ...this.state.cartItems,
                { ...product, quantity: 1 },
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
        return (
            <div className="App">
                <BrowserRouter>
                    <Header
                        categories={this.state.categories}
                        currentCategory={this.state.currentCategory}
                        handleCategoryChange={this.handleCategoryChange}
                        selectedCurrency={this.state.selectedCurrency}
                        currencies={this.state.currencies}
                        handleSelectedCurrencyChange={
                            this.handleSelectedCurrencyChange
                        }
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProductListingPage
                                    storeItems={this.state.storeItems}
                                    currentCategory={this.state.currentCategory}
                                    selectedCurrency={
                                        this.state.selectedCurrency
                                    }
                                />
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <ProductDescriptionPage
                                    productId={this.state.productId}
                                    selectedCurrency={
                                        this.state.selectedCurrency
                                    }
                                    cartItems={this.state.cartItems}
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
