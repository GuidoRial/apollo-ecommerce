import React, { Component } from "react";
import uniqid from "uniqid";
import CartOverlayItem from "./CartOverlayItem";
import "./CartOverlay.css";
import { Link } from "react-router-dom";

export default class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = { total: 0 };
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    getTotalPrice = (selectedCurrency, cart) => {
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.cartItems !== nextProps.cartItems) {
            this.getTotalPrice(
                this.props.selectedCurrency,
                nextProps.cartItems,
                this.props.amountOfItems
            );
        }
        return true;
    }

    render() {
        const {
            cartItems,
            selectedCurrency,
            amountOfItems,
            alternateCartOverlayMenuStatus,
            handleAddProduct,
            handleRemoveProduct,
        } = this.props;
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
                        handleAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}
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
                    <Link to={"/cart"}>
                        <button
                            onClick={() => alternateCartOverlayMenuStatus()}
                            className="cart-overlay-action-buttons"
                            id="viewBagButton"
                        >
                            VIEW BAG
                        </button>
                    </Link>
                    <button
                        onClick={() =>
                            alert(
                                "I should be a function in charge of handling checkout, I'm just an alert instead"
                            )
                        }
                        className="cart-overlay-action-buttons"
                        id="checkOutButton"
                    >
                        CHECK OUT
                    </button>
                </div>
            </div>
        );
    }
}
