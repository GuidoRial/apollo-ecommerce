import React, { Component } from "react";
import "./ItemCounter.css";
export default class ItemCounter extends Component {
    render() {
        const { amountOfItems, alternateCartOverlayMenuStatus } = this.props;
        return (
            <div
                className="item-counter flex-justify-align"
                onClick={() => alternateCartOverlayMenuStatus()}
            >
                {amountOfItems}
            </div>
        );
    }
}
