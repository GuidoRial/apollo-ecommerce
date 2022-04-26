import React, { Component } from "react";
import "./Attributes.css";

export default class Attribute extends Component {
    constructor() {
        super();
        this.state = {
            selectedAttribute: "",
        };
    }

    render() {
        const { attribute, selectedAttributes, handleSelectedAttributes } =
            this.props;
        //console.log(selectedAttributes);
        //console.log(attribute.items);
        //console.log(this.state.selectedAttribute);
        return (
            <div>
                <p className="attribute-title">{attribute.id}:</p>
                <div className="attribute-button-container">
                    {attribute?.items?.map((item) => (
                        <div
                            style={
                                this.state.selectedAttribute === item.value &&
                                attribute.id === "Color"
                                    ? {
                                          border: "2px solid #9ae0ac",
                                          padding: "1px",
                                      }
                                    : null
                            }
                            key={item.id}
                            onClick={() =>
                                handleSelectedAttributes(
                                    attribute.id,
                                    item.value
                                )
                            }
                        >
                            {attribute.id === "Color" ? (
                                <button
                                    className="attribute-button"
                                    onClick={() =>
                                        this.setState({
                                            selectedAttribute: item.value,
                                        })
                                    }
                                    style={{
                                        backgroundColor: `${item.value}`,
                                        border: "1px solid #D1D1D1",
                                    }}
                                ></button>
                            ) : (
                                <button
                                    className="attribute-button"
                                    onClick={() =>
                                        this.setState({
                                            selectedAttribute: item.value,
                                        })
                                    }
                                    style={
                                        this.state.selectedAttribute ===
                                        item.value
                                            ? {
                                                  backgroundColor: "#1D1F22",
                                                  color: "#FFFFFF",
                                              }
                                            : null
                                    }
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
