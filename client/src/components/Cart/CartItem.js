import React, { Component } from "react";
import uniqid from "uniqid";
import { getPrice } from "../../utils";
import CartAttribute from "./CartAttribute";

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productPrice: "",
            carouselIndex: 0,
        };
        this.handleCarousel = this.handleCarousel.bind(this);
    }

    handleCarousel = (operation) => {
        const { carouselIndex } = this.state;
        const { item } = this.props;
        if (operation === "next") {
            if (carouselIndex + 1 > item.gallery.length - 1) {
                this.setState({ carouselIndex: 0 });
            } else {
                this.setState({ carouselIndex: carouselIndex + 1 });
            }
        } else {
            if (carouselIndex - 1 < 0) {
                this.setState({
                    carouselIndex: item.gallery.length - 1,
                });
            } else {
                this.setState({ carouselIndex: carouselIndex - 1 });
            }
        }
    };

    componentDidMount() {
        this.setState({
            productPrice: getPrice(
                this.props.item.prices,
                this.props.selectedCurrency
            ),
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            this.setState({
                productPrice: getPrice(
                    this.props.item.prices,
                    nextProps.selectedCurrency
                ),
            });
        }
        return true;
    }
    render() {
        const { item, handleAddProduct, handleRemoveProduct } = this.props;
        const { productPrice, carouselIndex } = this.state;
        return (
            <div className="cart-item">
                <div className="cart-item-data">
                    <div>
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                        <p className="bold-text">
                            {productPrice?.currency?.symbol}
                            {productPrice?.amount}
                        </p>
                    </div>
                    {item?.attributes.map((attribute) => (
                        <CartAttribute attribute={attribute} key={uniqid()}/>
                    ))}
                </div>

                <div className="cart-item-carousel-and-buttons">
                    <div className="cart-item-buttons">
                        <button
                            className="cart-overlay-button flex-justify-align"
                            onClick={() =>
                                handleAddProduct(item, item.selectedAttributes)
                            }
                        >
                            +
                        </button>
                        <p className="bold-text">{item.quantity}</p>
                        <button
                            className="cart-overlay-button flex-justify-align"
                            onClick={() =>
                                handleRemoveProduct(
                                    item,
                                    item.selectedAttributes
                                )
                            }
                        >
                            -
                        </button>
                    </div>
                    <div className="carousel-container">
                        <img
                            src={item.gallery[carouselIndex]}
                            alt="item preview"
                            className="cart-overlay-image"
                        />
                        {item?.gallery?.length > 1 && (
                            <div className="carousel-buttons flex-justify-align">
                                <button
                                    className="carousel-button  "
                                    onClick={() => this.handleCarousel("prev")}
                                >
                                    {"<"}
                                </button>
                                <button
                                    className="carousel-button  "
                                    onClick={() => this.handleCarousel("next")}
                                >
                                    {">"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
