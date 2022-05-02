import React, { Component } from "react";
import CartItem from "./CartItem";
import LineBreak from "./LineBreak";
import "./Cart.css";

export default class Cart extends Component {
    render() {
        const {
            cartItems,
            handleAddProduct,
            handleRemoveProduct,
            selectedCurrency,
            amountOfItems,
            total,
            tax,
        } = this.props;
        /**
         * In figma taxes were fixed and weren't included in the total price
         * so I didn't add it here, but if I was to add it
         * I'd create a state with the name of "finalPrice" and add
         * this.props.tax.amount with this.props.total
         */
        return (
            <section className="flex-justify-align cart">
                <div className="title-container">
                    <p className="bold-text cart-text"> CART</p>
                </div>
                <LineBreak />
                {cartItems.map((item) => (
                    <>
                        <CartItem
                            item={item}
                            handleAddProduct={handleAddProduct}
                            handleRemoveProduct={handleRemoveProduct}
                            selectedCurrency={selectedCurrency}
                        />
                        <LineBreak />
                    </>
                ))}
                <div className="cart-summary">
                    <div className="summary-item">
                        <p>Tax:</p>
                        <span className="bold-text">
                            {tax?.currency?.symbol}
                            {tax?.amount}
                        </span>
                    </div>
                    <div className="summary-item">
                        <p>Qty:</p>
                        <span className="bold-text">{amountOfItems}</span>
                    </div>
                    <div className="summary-item">
                        <p>Total:</p>
                        <span className="bold-text">
                            {selectedCurrency}
                            {total}
                        </span>
                    </div>
                    <button
                        className="cart-overlay-action-buttons"
                        id="checkOutButton"
                    >
                        ORDER
                    </button>
                </div>
            </section>
        );
    }
}
