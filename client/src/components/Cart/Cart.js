import React, { Component } from "react";
import uniqid from "uniqid";
import CartItem from "./CartItem";
import LineBreak from "./LineBreak";
import "./Cart.css";
import { Link } from "react-router-dom";

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
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <React.Fragment key={uniqid()}>
                            <CartItem
                                item={item}
                                handleAddProduct={handleAddProduct}
                                handleRemoveProduct={handleRemoveProduct}
                                selectedCurrency={selectedCurrency}
                            />
                            <LineBreak />
                        </React.Fragment>
                    ))
                ) : (
                    <div className="flex-justify-align cart-is-empty">
                        <p>Cart seems to be empty right now, why don't you </p>
                        <Link to="/" className="">
                            <p className="cart-is-empty-link">
                                go do some shopping?
                            </p>
                        </Link>
                    </div>
                )}
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
