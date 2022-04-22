import React, { Component } from "react";
import "./Attributes.css";

export default class Attribute extends Component {
    render() {
        const { attribute } = this.props;

        return (
            <div>
                <div>
                    <p className="attribute-title">{attribute.id}:</p>
                    <div className="attribute-button-container">
                        {attribute?.items?.map((item) => (
                            <button
                                className="attribute-button"
                                key={item.id}
                                style={
                                    attribute.id === "Color"
                                        ? {
                                              backgroundColor: `${item.value}`,
                                              opacity: "1",
                                              border: "1px solid #D1D1D1",
                                          }
                                        : null
                                }
                            >
                                {attribute.id === "Color" ? null : item.value}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
