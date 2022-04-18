import "./App.css";
import { Component } from "react";
import { client } from "./index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    getItems,
    getAllProducts,
    getItemsByCategory,
    getCategories,
    getCurrencies,
    getItemsById,
} from "./queries";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDescriptionPage from "./components/ProductDescriptionPage/ProductDescriptionPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";

class App extends Component {
    constructor() {
        super();
        /*
        const testFunction = async () => {
            const result = await client
                .query({
                    query: getItemsByCategory,
                    variables: {
                        title: "clothes",
                    },
                })
                .then((result) => console.log(result.data));
        };

        testFunction();
        */

        //Get categories
        //Get currencies
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<ProductListingPage />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDescriptionPage />}
                        />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
