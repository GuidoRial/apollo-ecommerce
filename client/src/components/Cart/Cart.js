import React, { Component } from "react";
import CartItem from "./CartItem";
import LineBreak from "./LineBreak";

export default class Cart extends Component {
    render() {
        const { cartItems, handleAddProduct, handleRemoveProduct } = this.props;
        return (
            <section>
                <div>CART</div>
                <LineBreak />
                {cartItems.map((item) => (
                    <CartItem
                        item={item}
                        handleAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))}
            </section>
        );
    }
}
