import React, { Component } from "react";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";
import DropdownOff from "../../Assets/Icons/DropdownOff.svg";
import DropdownOn from "../../Assets/Icons/DropdownOn.svg";
import "./Header.css";
import { Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { categories, currentCategory, handleCategoryChange } =
            this.props;

        //console.log(currentCategory);
        return (
            <nav className="nav-bar">
                <div className="categories">
                    {categories.map((category) => (
                        <div
                            className="category"
                            key={category.name}
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
                <Link to="/">
                    <img className="e-logo" src={Logo} alt="e-commerce-logo" />
                </Link>
                <div className="currency-cart">
                    $<img src={DropdownOff} />{" "}
                    <img src={EmptyCart} alt="empty-cart" />
                </div>
            </nav>
        );
    }
}
