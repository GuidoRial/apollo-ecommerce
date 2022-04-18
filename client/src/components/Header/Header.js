import React, { Component } from "react";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";

export default class Header extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="categories">ALL TECH CLOTHES</div>
                <img src={Logo} alt="e-commerce-logo" />
                <div className="currency-cart">
                    $ <img src={EmptyCart} alt="empty-cart" />
                </div>
            </nav>
        );
    }
}
