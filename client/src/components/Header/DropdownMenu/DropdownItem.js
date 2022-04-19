import React, { Component } from "react";
import "../Header.css";

export default class DropdownItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currency } = this.props;
        return (
            <a href="#" className="menu-item">
                {currency.symbol} {currency.label}
            </a>
        );
    }
}
