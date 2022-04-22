import React, { Component } from "react";
import { client } from "../..";
import { getProductById } from "../../queries";
import Attribute from "./Attribute";
import "./ProductDescriptionPage.css";

export default class ProductDescriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individualProduct: {},
            selectedImage: 0,
            productPrice: "",
        };
        this.getId = this.getId.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.filterCorrectPrice = this.filterCorrectPrice.bind(this);
    }

    filterCorrectPrice = (item, selectedCurrency) => {
        const [correctPrice] = item?.prices?.filter(
            (price) => price.currency.symbol === selectedCurrency
        );
        this.setState({ productPrice: correctPrice });
    };

    fetchProduct = async (productId) => {
        await client
            .query({
                query: getProductById,
                variables: {
                    id: productId,
                },
            })
            .then((result) => {
                this.setState({ individualProduct: result.data.product });
            })
            .then(() => {
                this.filterCorrectPrice(
                    this.state.individualProduct,
                    this.props.selectedCurrency
                );
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            this.filterCorrectPrice(
                this.state.individualProduct,
                nextProps.selectedCurrency
            );
        }
        return true;
    }

    render() {
        const { individualProduct, selectedImage } = this.state;
        return (
            <section className="individual-product">
                {individualProduct && individualProduct.gallery && (
                    <div className="product-showcase">
                        <div className="mini-pictures">
                            {individualProduct.gallery.map((image, index) => (
                                <img
                                    className="mini-picture"
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
                            className="big-picture"
                            src={individualProduct.gallery[selectedImage]}
                            alt={`${individualProduct.brand}, ${individualProduct.name}`}
                        />
                    </div>
                )}

                <div className="product-data">
                    <p className="product-brand">{individualProduct.brand}</p>
                    <p className="product-name">{individualProduct.name}</p>
                    {individualProduct?.attributes?.map((attribute) => (
                        <Attribute key={attribute.id} attribute={attribute} />
                    ))}

                    <p className="price-text">PRICE: </p>
                    <p className="product-price">
                        {this.state.productPrice?.currency?.symbol}
                        {this.state.productPrice?.amount}
                    </p>
                    <button
                        className="add-to-cart-button"
                        disabled={!individualProduct.inStock}
                        style={
                            individualProduct.inStock
                                ? { opacity: "1" }
                                : { opacity: "0.8", cursor: "not-allowed" }
                        }
                    >
                        {individualProduct.inStock
                            ? "ADD TO CART"
                            : "OUT OF STOCK"}
                    </button>
                    <div
                        className="product-description"
                        dangerouslySetInnerHTML={{
                            __html: individualProduct.description,
                        }}
                    />
                </div>
            </section>
        );
    }
}
