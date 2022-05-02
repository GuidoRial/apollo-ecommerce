import React, { Component } from "react";
import uniqid from "uniqid";

export default class CartAttribute extends Component {
    render() {
        const { attribute } = this.props;
        return (
            <div key={uniqid()}>
                <p className="mini-attribute-title">{attribute.name}:</p>
                <div className="mini-attribute-button-container">
                    {attribute?.items?.map((item) => (
                        <div
                            className="flex-justify-align"
                            key={uniqid()}
                            style={
                                attribute.id === "Color" && item.isSelected
                                    ? {
                                          border: "2px solid #9ae0ac",
                                          padding: "1px",
                                      }
                                    : null
                            }
                        >
                            {attribute.id === "Color" ? (
                                <button
                                    disabled={!item.isSelected}
                                    style={{
                                        backgroundColor: `${item.value}`,
                                        border: "2px solid #D1D1D1",
                                    }}
                                    className="mini-attribute-button flex-justify-align"
                                    id="miniAttributeColorButton"
                                ></button>
                            ) : (
                                <button
                                    style={
                                        !item.isSelected
                                            ? {
                                                  backgroundColor: "#1D1F22",
                                                  color: "#FFFFFF",
                                              }
                                            : null
                                    }
                                    className="attribute-button flex-justify-align"
                                >
                                    {item.value}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
