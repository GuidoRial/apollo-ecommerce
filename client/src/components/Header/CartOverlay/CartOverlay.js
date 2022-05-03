import React, { Component } from "react";
import uniqid from "uniqid";
import CartOverlayItem from "./CartOverlayItem";
import "./CartOverlay.css";
import { Link } from "react-router-dom";

export default class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.cartOverlayRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (
            this.cartOverlayRef &&
            !this.cartOverlayRef.current.contains(event.target)
        ) {
            this.props.alternateCartOverlayMenuStatus();
        }
    }

    render() {
        const {
            handleAddProduct,
            handleRemoveProduct,
            cartItems,
            selectedCurrency,
            amountOfItems,
            alternateCartOverlayMenuStatus,
            total,
        } = this.props;

        return (
            <div
                className="dropdown"
                id="cartOverlay"
                ref={this.cartOverlayRef}
            >
                <div className="bag-count">
                    <p className="bold-text">My bag,</p>
                    {amountOfItems === 1 ? (
                        <span>{amountOfItems} item</span>
                    ) : (
                        <span>{amountOfItems} items</span>
                    )}
                </div>

                {cartItems?.map((item) => (
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
