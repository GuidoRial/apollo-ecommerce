import React, { Component } from "react";
import uniqid from "uniqid";
import MiniAttribute from "./MiniAttribute";
import "./CartOverlayItem.css";

export default class CartOverlayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productPrice: "",
        };
        this.filterCorrectPrice = this.filterCorrectPrice.bind(this);
    }

    filterCorrectPrice = (item, selectedCurrency) => {
        const [correctPrice] = item?.prices?.filter(
            (price) => price.currency.symbol === selectedCurrency
        );
        this.setState({ productPrice: correctPrice });
    };

    componentDidMount() {
        this.filterCorrectPrice(this.props.item, this.props.selectedCurrency);
    }

    render() {
        const { item, handleAddProduct, handleRemoveProduct } = this.props;
        const { productPrice } = this.state;

        return (
            <div className="cart-overlay-item">
                <div className="cart-overlay-item-data">
                    <div>
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                        <p className="bold-text">
                            {productPrice?.currency?.symbol}
                            {productPrice?.amount}
                        </p>
                    </div>
                    {item?.attributes.map((attribute) => (
                        <MiniAttribute
                            key={uniqid()}
                            attribute={attribute}
                            selectedAttributes={item.selectedAttributes}
                        />
                    ))}
                </div>
                <div className="cart-overlay-buttons">
                    <button
                        className="cart-overlay-button"
                        onClick={() =>
                            handleAddProduct(item, item.selectedAttributes)
                        }
                    >
                        +
                    </button>
                    <p className="bold-text">{item.quantity}</p>
                    <button
                        className="cart-overlay-button"
                        onClick={() =>
                            handleRemoveProduct(item, item.selectedAttributes)
                        }
                    >
                        -
                    </button>
                </div>
                <div className="cart-overlay-image-container">
                    <img
                        src={item.gallery[0]}
                        alt="item preview"
                        className="cart-overlay-image"
                    />
                </div>
            </div>
        );
    }
}
