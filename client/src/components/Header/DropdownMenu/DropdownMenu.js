import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../Header.css";

export default class DropdownMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currencies, selectedCurrency, handleSelectedCurrencyChange } =
            this.props;
        //console.log(currencies);
        //console.log(selectedCurrency);

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
                        />
                    ))
                ) : (
                    <div className="dropdown">Loading...</div>
                )}
            </div>
        );
    }
}
