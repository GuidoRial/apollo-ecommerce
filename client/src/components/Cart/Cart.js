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
        } = this.props;
        return (
            <section>
                <div>CART</div>
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
            </section>
        );
    }
}
