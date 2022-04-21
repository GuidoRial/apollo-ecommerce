import React, { Component } from "react";
import "./Attributes.css";

export default class Attribute extends Component {
    render() {
        const { attribute } = this.props;

        return (
            <div>
                {attribute.id === "Size" && (
                    <div>
                        <p className="attribute-title">{attribute.id}:</p>
                        <div className="attribute-button-container">
                            {attribute?.items?.map((item) => (
                                <button
                                    className="attribute-button"
                                    key={item.id}
                                >
                                    {item.value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {attribute.id === "Color" && (
                    <div>
                        <p className="attribute-title">{attribute.id}:</p>
                        <div className="attribute-button-container">
                            {attribute?.items?.map((item) => (
                                <button
                                    className="attribute-button"
                                    id="colorButton"
                                    key={item.id}
                                    style={{ backgroundColor: item.value }}
                                ></button>
                            ))}
                        </div>
                    </div>
                )}
                {attribute.id === "Capacity" && (
                    <div>
                        <p className="attribute-title">{attribute.id}:</p>
                        <div className="attribute-button-container">
                            {attribute?.items?.map((item) => (
                                <button
                                    className="attribute-button"
                                    key={item.id}
                                >
                                    {item.value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {(attribute.id === "With USB 3 ports" ||
                    attribute.id === "Touch ID in keyboard") && (
                    <div>
                        <p className="attribute-title">{attribute.id}:</p>
                        <div className="attribute-button-container">
                            {attribute?.items?.map((item) => (
                                <button
                                    className="attribute-button"
                                    key={item.id}
                                >
                                    {item.value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
