import React, { Component } from "react";
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
        /* 
        if next
            if nextIndex is bigger than this.props.item.gallery.length
                index = 0
            else 
                index + 1
        else
            if prevIndex < 0
                prevIndex = this.props.item.gallery.length
            else
                index -1
        */
        if (operation === "next") {
            if (
                this.state.carouselIndex + 1 >
                this.props.item.gallery.length - 1
            ) {
                this.setState({ carouselIndex: 0 });
            } else {
                this.setState({ carouselIndex: this.state.carouselIndex + 1 });
            }
        } else {
            if (this.state.carouselIndex - 1 < 0) {
                this.setState({
                    carouselIndex: this.props.item.gallery.length - 1,
                });
            } else {
                this.setState({ carouselIndex: this.state.carouselIndex - 1 });
            }
            /*
            if (this.state.carouselIndex - 1 === 0) {
                this.setState({
                    carouselIndex: this.props.item.gallery.length - 1,
                });
            } else {
                this.setState({ carouselIndex: this.state.carouselIndex - 1 });
            }
            */
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
    render() {
        const { item, handleAddProduct, handleRemoveProduct } = this.props;
        const { productPrice, carouselIndex } = this.state;
        console.log("gallery length:" + item.gallery.length);
        console.log("current index:" + carouselIndex);
        return (
            <div key={item.id}>
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
                        <CartAttribute attribute={attribute} />
                    ))}
                </div>
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
                            handleRemoveProduct(item, item.selectedAttributes)
                        }
                    >
                        -
                    </button>
                </div>
                <div className="cart-item-carousel">
                    <img
                        src={item.gallery[carouselIndex]}
                        alt="item preview"
                        className="cart-overlay-image"
                    />
                    {item?.gallery?.length > 1 && (
                        <div className="carousel-buttons">
                            <button onClick={() => this.handleCarousel("prev")}>
                                {"<"}
                            </button>
                            <button onClick={() => this.handleCarousel("next")}>
                                {">"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
