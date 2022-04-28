import React, { Component } from "react";
import uniqid from "uniqid";
import CartOverlayItem from "./CartOverlayItem";
import "./CartOverlay.css";

export default class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = { amountOfItems: 0 };
        this.calculateAmountOfItems = this.calculateAmountOfItems.bind(this);
    }

    calculateAmountOfItems = (cartItems) => {
        let initialValue = 0;
        for (let item of cartItems) {
            initialValue += item.quantity;
        }

        this.setState({ amountOfItems: initialValue });
    };

    componentDidMount() {
        this.calculateAmountOfItems(this.props.cartItems);
    }

    render() {
        const { cartItems, selectedCurrency } = this.props;
        const { amountOfItems } = this.state;
        //console.log(cartItems);
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
