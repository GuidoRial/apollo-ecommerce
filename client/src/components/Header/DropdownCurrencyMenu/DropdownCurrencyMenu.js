import React, { Component } from "react";
import DropdownItem from "./DropdownItem";
import "../Header.css";

export default class DropdownCurrencyMenu extends Component {
    constructor(props) {
        super(props);
        this.currencyMenuRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (
            this.currencyMenuRef &&
            !this.currencyMenuRef.current.contains(event.target)
        ) {
            this.props.alternateDropdownCurrencyMenuStatus();
        }
    }
    render() {
        const { currencies, handleSelectedCurrencyChange } = this.props;

        return (
            <div className="dropdown" ref={this.currencyMenuRef}>
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
