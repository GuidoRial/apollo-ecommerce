import React, { Component } from "react";
import "../Header.css";

export default class DropdownItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            currency,
            selectedCurrency,
            handleSelectedCurrencyChange,
            dropdownMenu,
        } = this.props;

        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
                href="#"
                className="menu-item"
                onClick={() => handleSelectedCurrencyChange(currency.symbol)}
            >
                <p>{currency.symbol}</p> <p>{currency.label}</p>
            </a>
        );
    }
}
