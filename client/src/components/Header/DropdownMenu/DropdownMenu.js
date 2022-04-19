import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../Header.css";

export default class DropdownMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currencies } = this.props;
        console.log(currencies);
        return (
            <div className="dropdown">
                {currencies ? (
                    currencies.map((currency) => (
                        <DropdownItem
                            key={currency.label}
                            currency={currency}
                        />
                    ))
                ) : (
                    <div className="dropdown">Loading...</div>
                )}
            </div>
        );
    }
}
