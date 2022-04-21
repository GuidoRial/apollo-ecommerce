import React, { Component } from "react";
import { client } from "../..";
import { getProductById } from "../../queries";

export default class ProductDescriptionPage extends Component {
    constructor() {
        super();
        this.state = {
            individualProduct: {},
            selectedImage: 0,
        };
        this.getId = this.getId.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
    }
    fetchProduct = async (productId) => {
        const result = await client
            .query({
                query: getProductById,
                variables: {
                    id: productId,
                },
            })
            .then((result) => {
                this.setState({ individualProduct: result.data.product });
            });
    };
    getId = () => {
        /* 
            useParams because functional components are not allowed.
            I thought about using a Higher Order Component but by definition they are a function that takes a component as a parameter and return a component, thus making it a functional component which is not allowed.
            I considered using withRouter (https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it) but I wont because of the reasons disclosed above.
            
            My solution to this problem was to isolate the id by manipulating the window.location object until it always return whatever is after /products/, therefore, returning the product id
            */
        const idFromURL = window.location.pathname.toString().substring(10);

        return idFromURL;
    };
    componentDidMount() {
        this.fetchProduct(this.getId());
    }

    render() {
        const { individualProduct, selectedImage } = this.state;
        console.log(individualProduct);
        console.log(selectedImage);

        return (
            <section className="individual-product">
                {individualProduct && individualProduct.gallery && (
                    <div className="product-showcase">
                        <div className="mini-pictures">
                            {individualProduct.gallery.map((image, index) => (
                                <img
                                    onClick={() =>
                                        this.setState({
                                            selectedImage: index,
                                        })
                                    }
                                    key={`image-number-${index}`}
                                    src={image}
                                    alt="mini-pic"
                                />
                            ))}
                        </div>

                        <img
                            src={individualProduct.gallery[selectedImage]}
                            alt={`${individualProduct.brand}, ${individualProduct.name}`}
                        />
                    </div>
                )}

                <div className="product-data"></div>
            </section>
        );
    }
}
