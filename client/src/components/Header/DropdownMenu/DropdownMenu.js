import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../Header.css";

export default class DropdownMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            currencies,
            selectedCurrency,
            handleSelectedCurrencyChange,
            dropdownMenu,
        } = this.props;
        //console.log(currencies);
        //console.log(selectedCurrency);
        //console.log(dropdownMenu);
        return (
            <div className="dropdown">
                {currencies ? (
                    currencies.map((currency) => (
                        <DropdownItem
                            key={currency.label}
                            currency={currency}
                            selectedCurrency={selectedCurrency}
                            handleSelectedCurrencyChange={
                                handleSelectedCurrencyChange
                            }
                            dropdownMenu={dropdownMenu}
                        />
                    ))
                ) : (
                    <div className="dropdown">Loading...</div>
                )}
            </div>
        );
    }
}
