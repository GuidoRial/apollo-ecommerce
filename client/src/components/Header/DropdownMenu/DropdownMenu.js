import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../Header.css";

export default class DropdownMenu extends Component {
    render() {
        const {
            currencies,
            handleSelectedCurrencyChange,
        } = this.props;

        return (
            <div className="dropdown">
                {currencies ? (
                    currencies.map((currency) => (
                        <DropdownItem
                            key={currency.label}
                            currency={currency}
                            handleSelectedCurrencyChange={
                                handleSelectedCurrencyChange
                            }
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }
}
