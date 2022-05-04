import React, { Component } from "react";
import { client } from "../index";
import {
    getCategories,
    getCurrencies,
    getProductsByCategory,
} from "../queries";
import { getPrice, taxes, getProductFromCart } from "../utils";

const StoreContext = React.createContext();

export class StoreProvider extends Component {
    state = {
        successAlert: false,
        categories: [],
    };

    /**
     * Create an alert to give feedback to the user
     * and during these 4s disable buy button to prevent users from
     * making mistakes when adding things to cart
     */
    handleSuccessAlert = () => {
        this.setState({ successAlert: true });
        setTimeout(() => {
            this.setState({ successAlert: false });
        }, 4000);
    };

    fetchCategories = async () => {
        const result = await client.query({
            query: getCategories,
        });

        const categories = await result.data.categories;
        this.setState({ categories: categories });
    };

    componentDidMount() {
        this.fetchCategories();
    }

    render() {
        const { successAlert, categories } = this.state;
        const { handleSuccessAlert } = this;
        return (
            <StoreContext.Provider
                value={{ handleSuccessAlert, successAlert, categories }}
            >
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

export default StoreContext;
