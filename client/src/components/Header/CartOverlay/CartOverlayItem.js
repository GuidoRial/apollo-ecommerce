import React, { Component } from "react";
import uniqid from "uniqid";
import MiniAttribute from "./MiniAttribute";
import "./CartOverlayItem.css";
import { getPrice } from "../../../utils";

export default class CartOverlayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productCurrency: "",
            productPrice: 0,
        };
    }

    componentDidMount() {
        let price = getPrice(
            this.props.item.prices,
            this.props.selectedCurrency
        );
        let symbol = price.currency.symbol;
        let number = price.amount.toFixed(2);
        this.setState({
            productPrice: number,
            productCurrency: symbol,
        });
    }

    render() {
        const { item, handleAddProduct, handleRemoveProduct } = this.props;
        const { productPrice, productCurrency } = this.state;

        return (
            <div className="cart-overlay-item" key={item.id}>
                <div className="cart-overlay-item-data">
                    <div>
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                        <p className="bold-text">
                            {productCurrency}
                            {productPrice}
                        </p>
                    </div>
                    {item?.attributes.map((attribute) => (
                        <MiniAttribute attribute={attribute} key={uniqid()} />
                    ))}
                </div>
                <div className="cart-overlay-buttons">
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
