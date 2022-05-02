import React, { Component } from "react";
import "./ItemCounter.css";
export default class ItemCounter extends Component {
    render() {
        const { amountOfItems } = this.props;
        return (
            <div className="item-counter flex-justify-align">
                {amountOfItems}
            </div>
        );
    }
}
