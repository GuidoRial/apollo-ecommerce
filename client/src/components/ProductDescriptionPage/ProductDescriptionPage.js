import React, { Component } from "react";
import DOMPurify from "dompurify";
import { client } from "../..";
import { getProductById } from "../../queries";
import Attribute from "./Attribute";
import { getPrice } from "../../utils";
import Alert from "../Alert/Alert";
import "./ProductDescriptionPage.css";
import StoreContext from "../../Context/StoreContext";

export default class ProductDescriptionPage extends Component {
    static contextType = StoreContext;
    constructor(props) {
        super(props);
        this.state = {
            individualProduct: {},
            selectedImage: 0,
            productPrice: "",
            selectedAttributes: [],
            allAttributesAreSelected: false,
        };
        this.getId = this.getId.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.handleSelectedAttributes =
            this.handleSelectedAttributes.bind(this);
        this.handleAllAttributesAreSelected =
            this.handleAllAttributesAreSelected.bind(this);
        this.handleProductHasNoAttributes =
            this.handleProductHasNoAttributes.bind(this);
    }

    fetchProduct = async (productId) => {
        const result = await client.query({
            query: getProductById,
            variables: {
                id: productId,
            },
        });
        const product = await result.data.product;
        this.setState({ individualProduct: product });

        this.setState({
            productPrice: getPrice(product.prices, this.props.selectedCurrency),
        });

        this.handleProductHasNoAttributes();
    };
    /**
     *useParams was banned because functional components are not allowed.
     *I thought about using a Higher Order Component but
     *by definition they are a function that takes a component as a parameter and returns a component,
     *thus making it a functional component which is not allowed.
     *I considered using withRouter (https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it)
     *but I wont because of the reasons disclosed above.
     *
     *My solution to this problem was to isolate the id by manipulating the window.location object
     *until it always return whatever is after /products/, therefore, returning the product id
     * @returns productId from URL
     */
    getId = () => {
        const idFromURL = window.location.pathname.toString().substring(10);

        return idFromURL;
    };

    handleSelectedAttributes = (id, value) => {
        const newSelectedAttribute = { id, value }; //Create a new object with user preferences
        let userAttributes = [...this.state.selectedAttributes]; //Create a clone that I can manipulate

        const existingAttribute = userAttributes.find(
            (attribute) => attribute.id === newSelectedAttribute.id
        );

        if (existingAttribute) {
            //if the user wants to update an attribute
            for (let i = 0; i < userAttributes.length; i++) {
                if (userAttributes[i].id === newSelectedAttribute.id) {
                    //look it up and replace it
                    userAttributes[i] = { ...newSelectedAttribute };
                }
            }
        } else {
            userAttributes.push(newSelectedAttribute);
        }

        this.setState({ selectedAttributes: userAttributes });
    };

    handleAllAttributesAreSelected = () => {
        this.setState({ allAttributesAreSelected: true });
        //Which will let the user actually add this item to the cart
    };

    handleProductHasNoAttributes = () => {
        //If it has no attributes, the user should be able to add it to cart on component mount
        if (this.state.individualProduct?.attributes?.length === 0) {
            this.setState({ allAttributesAreSelected: true });
        }
    };

    componentDidMount() {
        this.fetchProduct(this.getId());
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedCurrency } = this.props;
        const { individualProduct, selectedAttributes } = this.state;
        if (selectedCurrency !== nextProps.selectedCurrency) {
            //Render correct currency on selectedCurrency change
            this.setState({
                productPrice: getPrice(
                    individualProduct.prices,
                    nextProps.selectedCurrency
                ),
            });
        }

        if (
            selectedAttributes !== nextState.selectedAttributes &&
            nextState.selectedAttributes.length ===
                individualProduct.attributes.length
        ) {
            //If there's a change in selected attributes
            //and user selected all attributes then...
            this.handleAllAttributesAreSelected();
        }

        return true;
    }

    render() {
        const {
            individualProduct,
            selectedImage,
            selectedAttributes,
            productPrice,
            allAttributesAreSelected,
        } = this.state;
        const { handleAddProduct } = this.props;
        const { successAlert, handleSuccessAlert } = this.context;

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
                        <Attribute
                            key={attribute.id}
                            attribute={attribute}
                            handleSelectedAttributes={
                                this.handleSelectedAttributes
                            }
                            selectedAttributes={selectedAttributes}
                        />
                    ))}
                    <p className="price-text">PRICE: </p>
                    <p className="product-price">
                        {productPrice?.currency?.symbol}
                        {productPrice?.amount}
                    </p>

                    <button
                        onClick={() => {
                            handleAddProduct(
                                individualProduct,
                                selectedAttributes
                            );
                            handleSuccessAlert();
                        }}
                        className="add-to-cart-button"
                        disabled={
                            !individualProduct.inStock ||
                            !allAttributesAreSelected ||
                            successAlert
                        }
                        style={
                            individualProduct.inStock &&
                            allAttributesAreSelected
                                ? { opacity: "1" }
                                : { opacity: "0.8", cursor: "not-allowed" }
                        }
                    >
                        {individualProduct.inStock
                            ? "ADD TO CART"
                            : "OUT OF STOCK"}
                    </button>
                    {successAlert && <Alert />}
                    <div
                        className="product-description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                individualProduct.description
                            ),
                        }}
                    />
                    {/* 
                    Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites.
                    XSS attacks occur when an attacker uses a web application to send malicious code, 
                    generally in the form of a browser side script, to a different end user. 
                    DOMPurify sanitizes HTML and prevents XSS attacks. 
                    You can feed DOMPurify with string full of dirty HTML and it will return a string (unless configured otherwise) with clean HTML. 
                    DOMPurify will strip out everything that contains dangerous HTML and thereby prevent XSS attacks and other nastiness.
                    */}
                </div>
            </section>
        );
    }
}
