import React, { Component } from "react";
import { client } from "../..";
import { getProductById } from "../../queries";

export default class ProductDescriptionPage extends Component {
    constructor() {
        super();
        this.state = {
            individualProduct: {},
        };
        this.fetchProduct = this.fetchProduct.bind(this);
    }
    fetchProduct = async (id) => {
        const result = await client
            .query({
                query: getProductById,
                variables: {
                    id: id,
                },
            })
            .then((result) => {
                console.log(result.data);
            });
    };

    componentDidMount() {
        const getId = () => {
            /* 
            useParams because functional components are not allowed.
            I thought about using a Higher Order Component but by definition they are a function that takes a component as a parameter and return a component, thus making it a functional component which is not allowed.
            I considered using withRouter (https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it) but I wont because of the reasons disclosed above.
            
            My solution to this problem was to isolate the id by manipulating the window.location object until it always return whatever is after /products/, therefore, returning the product id
            */
            const thisPathname = window.location.pathname
                .toString()
                .substring(10);
            console.log(thisPathname);
        };

        getId();
    }

    componentWillUnmount() {}

    render() {


        /*
        
    1. Import data for individual product with ID
    2. Render
    */

        return <div>ProductDescriptionPage</div>;
    }
}
