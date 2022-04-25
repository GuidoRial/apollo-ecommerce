import React, { Component } from "react";
import "./Attributes.css";

export default class Attribute extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { attribute, selectedAttributes, handleSelectedAttribute } =
            this.props;

        //console.log(this.state.selectedAttributes);
        return (
            <div>
                <div>
                    <p className="attribute-title">{attribute.id}:</p>
                    <div className="attribute-button-container">
                        {attribute?.items?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() =>
                                    handleSelectedAttribute(
                                        attribute.id,
                                        item.value
                                    )
                                }
                            >
                                <button
                                    className="attribute-button"
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
                                    {attribute.id === "Color"
                                        ? null
                                        : item.value}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
