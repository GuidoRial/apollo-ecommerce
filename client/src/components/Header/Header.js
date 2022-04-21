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
        this.state = { dropdownMenu: false };
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
            currentCategory,
            handleCategoryChange,
            selectedCurrency,
            currencies,
            handleSelectedCurrencyChange,
        } = this.props;

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
                                dropdownMenu: !this.state.dropdownMenu,
                            })
                        }
                        style={
                            this.state.dropdownMenu === false
                                ? null
                                : { transform: "rotate(180deg)" }
                        }
                        src={DropdownOff}
                        alt="currency-menu"
                    />

                    <img src={EmptyCart} alt="empty-cart" />
                    {this.state.dropdownMenu && (
                        <DropdownMenu
                            currencies={currencies}
                            selectedCurrency={selectedCurrency}
                            handleSelectedCurrencyChange={
                                handleSelectedCurrencyChange
                            }
                            dropdownMenu={this.state.dropdownMenu}
                        />
                    )}
                </div>
            </nav>
        );
    }
}
