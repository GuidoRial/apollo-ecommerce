import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownCurrencyMenu from "./DropdownCurrencyMenu/DropdownCurrencyMenu";
import CartOverlay from "./CartOverlay/CartOverlay";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";
import DropdownOff from "../../Assets/Icons/DropdownOff.svg";
import "./Header.css";
import ItemCounter from "./ItemCounter";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownMenu: false,
            cartOverlayMenu: false,
        };

        this.alternateCartOverlayMenuStatus =
            this.alternateCartOverlayMenuStatus.bind(this);
    }

    alternateCartOverlayMenuStatus = () => {
        this.setState({
            cartOverlayMenu: !this.state.cartOverlayMenu,
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.dropdownMenu === true &&
            this.state.dropdownMenu === true
        ) {
            nextState.dropdownMenu = false;
        }

        return true;
    }
    render() {
        const {
            categories,
            handleCategoryChange,
            selectedCurrency,
            currencies,
            handleSelectedCurrencyChange,
            cartItems,
            handleAddProduct,
            handleRemoveProduct,
            amountOfItems,
            total,
            currentCategory,
        } = this.props;
        const { dropdownMenu, cartOverlayMenu } = this.state;

        return (
            <nav className="nav-bar">
                {cartOverlayMenu && <div className="curtain"></div>}
                <ul className="categories">
                    {categories.map((category) => (
                        <li
                            style={
                                currentCategory === category.name
                                    ? {
                                          color: "#5ece7b",
                                          borderBottom: "2px solid #5ece7b",
                                      }
                                    : { color: "#000000" }
                            }
                            className="category"
                            key={category.name}
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <Link to="/">
                    <img className="e-logo" src={Logo} alt="e-commerce-logo" />
                </Link>
                <div className="currency-cart flex-justify-align">
                    <p
                        onClick={() =>
                            this.setState({
                                dropdownMenu: !dropdownMenu,
                            })
                        }
                    >
                        {selectedCurrency}
                    </p>
                    <img
                        onClick={() =>
                            this.setState({
                                dropdownMenu: !dropdownMenu,
                            })
                        }
                        style={
                            dropdownMenu === false
                                ? null
                                : { transform: "rotate(180deg)" }
                        }
                        src={DropdownOff}
                        alt="currency-menu"
                    />
                    <img
                        src={EmptyCart}
                        alt="empty cart"
                        onClick={this.alternateCartOverlayMenuStatus}
                    />

                    {cartItems.length > 0 && (
                        <ItemCounter amountOfItems={amountOfItems} />
                    )}

                    {cartOverlayMenu && (
                        <CartOverlay
                            handleAddProduct={handleAddProduct}
                            handleRemoveProduct={handleRemoveProduct}
                            cartItems={cartItems}
                            selectedCurrency={selectedCurrency}
                            amountOfItems={amountOfItems}
                            alternateCartOverlayMenuStatus={
                                this.alternateCartOverlayMenuStatus
                            }
                            total={total}
                        />
                    )}
                    {dropdownMenu && (
                        <DropdownCurrencyMenu
                            currencies={currencies}
                            handleSelectedCurrencyChange={
                                handleSelectedCurrencyChange
                            }
                        />
                    )}
                </div>
            </nav>
        );
    }
}
