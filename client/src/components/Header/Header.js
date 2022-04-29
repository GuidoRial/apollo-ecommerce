import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropdownCurrencyMenu from "./DropdownCurrencyMenu/DropdownCurrencyMenu";
import CartOverlay from "../CartOverlay/CartOverlay";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";
import DropdownOff from "../../Assets/Icons/DropdownOff.svg";
import "./Header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdownMenu: false, cartOverlayMenu: false };
    }

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
        } = this.props;
        const { dropdownMenu, cartOverlayMenu } = this.state;
        return (
            <nav className="nav-bar">
                <ul className="categories">
                    {categories.map((category) => (
                        <li
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
                <div className="currency-cart">
                    <p>{selectedCurrency}</p>
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
                        onClick={() =>
                            this.setState({
                                cartOverlayMenu: !cartOverlayMenu,
                            })
                        }
                    />
                    {cartOverlayMenu && (
                        <CartOverlay
                            cartItems={cartItems}
                            selectedCurrency={selectedCurrency}
                        />
                    )}
                    {dropdownMenu && (
                        <DropdownCurrencyMenu
                            currencies={currencies}
                            handleSelectedCurrencyChange={
                                handleSelectedCurrencyChange
                            }
                            dropdownMenu={dropdownMenu}
                        />
                    )}
                </div>
            </nav>
        );
    }
}
