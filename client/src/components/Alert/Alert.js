import React, { Component } from "react";
import "./Alert.css";

export default class Alert extends Component {
    render() {
        return (
            <div className="alert">
                <p className="type-alert">Success!</p>
                <span className="alert-message">
                    Product added to cart successfully
                </span>
            </div>
        );
    }
}
