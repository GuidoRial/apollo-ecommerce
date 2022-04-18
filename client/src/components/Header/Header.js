import React, { Component } from "react";
import Logo from "../../Assets/Icons/logo.svg";
import EmptyCart from "../../Assets/Icons/EmptyCart.svg";
import DropdownOff from "../../Assets/Icons/DropdownOff.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownMenu: false,
        };
    }

    render() {
        const {
            categories,
            currentCategory,
            handleCategoryChange,
            selectedCurrency,
        } = this.props;

        //console.log(currentCategory);
        console.log(this.state.dropdownMenu);
        console.log(selectedCurrency);
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
                    <p>{selectedCurrency}</p>
                    <img
                        onClick={() =>
                            this.setState({
                                dropdownMenu: !this.state.dropdownMenu,
                            })
                        }
                        src={DropdownOff}
                        alt="currency-menu"
                        style={
                            this.state.dropdownMenu === false
                                ? null
                                : { transform: "rotate(180deg)" }
                        }
                    />
                    <img src={EmptyCart} alt="empty-cart" />
                </div>
                <DropdownMenu />
            </nav>
        );
    }
}
