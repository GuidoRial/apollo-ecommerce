import React, { Component } from "react";
import { client } from "../..";
import { getProductById } from "../../queries";
import { withRouter } from "react-router-dom";

export default class ProductDescriptionPage extends Component {
    fetchProduct = async (productId) => {
        const result = await client
            .query({
                query: getProductById,
                variables: productId,
            })
            .then((result) => console.log(result.data));
    };

    componentDidMount() {

    }

    render() {
        const { productId } = this.props;
        console.log(productId);
        /*
        
    1. Import data for individual product with ID
    2. Render
    */

        return <div>ProductDescriptionPage</div>;
    }
}
