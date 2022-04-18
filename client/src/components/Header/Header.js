import React, { Component } from "react";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { categories } = this.props;

        console.log(categories);
        return (
            <nav className="nav-bar">
                <div className="categories"></div>
                <img src={Logo} alt="e-commerce-logo" />
                <div className="currency-cart">
                    $ <img src={EmptyCart} alt="empty-cart" />
                </div>
            </nav>
        );
    }
}
