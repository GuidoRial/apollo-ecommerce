import React, { Component } from "react";
import uniqid from "uniqid";
import CartOverlayItem from "./CartOverlayItem";
import "./CartOverlay.css";

export default class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = { total: 0 };
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    getTotalPrice = (selectedCurrency, cart, amountOfItems) => {
        let totalPrice = 0;

        for (let item of cart) {
            const [correctPrice] = item?.prices?.filter(
                (price) => price.currency.symbol === selectedCurrency
            );

            totalPrice += correctPrice.amount * item.quantity;
        }

        this.setState({ total: totalPrice });
    };

    componentDidMount() {
        this.getTotalPrice(
            this.props.selectedCurrency,
            this.props.cartItems,
            this.props.amountOfItems
        );
    }

    render() {
        const { cartItems, selectedCurrency, amountOfItems } = this.props;
        const { total } = this.state;

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
                <div className="cart-overlay-total-price">
                    <p className="bold-text">Total</p>
                    <p className="bold-text">
                        {selectedCurrency}
                        {total}
                    </p>
                </div>
                <div className="bag-and-checkout-buttons">
                    <button>VIEW BAG</button>
                    <button>CHECK OUT</button>
                </div>
            </div>
        );
    }
}
