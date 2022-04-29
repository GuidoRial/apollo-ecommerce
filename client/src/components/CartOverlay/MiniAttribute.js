import React, { Component } from "react";
import uniqid from "uniqid";
import "./CartOverlayItem.css";

export default class MiniAttribute extends Component {
    render() {
        const { attribute } = this.props;
        return (
            <div key={uniqid()}>
                <p className="mini-attribute-title">{attribute.name}:</p>
                <div className="mini-attribute-button-container">
                    {attribute?.items?.map((item) => (
                        <div
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
                                    style={{
                                        backgroundColor: `${item.value}`,
                                        border: "1px solid #D1D1D1",
                                    }}
                                    className="mini-attribute-button"
                                ></button>
                            ) : (
                                <button
                                    style={
                                        item.isSelected
                                            ? { backgroundColor: "red" }
                                            : { backgroundColor: "blue" }
                                    }
                                    className="mini-attribute-button"
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
