import React, { Component } from "react";
import uniqid from "uniqid";
import CartOverlayItem from "./CartOverlayItem";
import "./CartOverlay.css";

export default class CartOverlay extends Component {
    render() {
        const { cartItems, selectedCurrency, amountOfItems } = this.props;
        return (
            <div className="dropdown" id="cartOverlay">
                <div className="bag-count">
                    <p className="bold-text">My bag,</p>
                    {amountOfItems === 1 ? (
                        <span>{amountOfItems} item</span>
                    ) : (
                        <span>{amountOfItems} items</span>
                    )}
                </div>

                {cartItems?.map((item) => (
                    //Had to add uniqid because header and PLP render the same item with the same id
                    <CartOverlayItem
                        key={uniqid()}
                        item={item}
                        selectedCurrency={selectedCurrency}
                    />
                ))}
            </div>
        );
    }
}
