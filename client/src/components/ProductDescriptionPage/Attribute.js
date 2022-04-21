import React, { Component } from "react";
import "./Attributes.css";

export default class Attribute extends Component {
    render() {
        const { attribute } = this.props;
        //console.log(attribute.id);
        return (
            <div>
                {attribute.id === "Size" && (
                    <div>
                        <p>{attribute.id}:</p>
                        {attribute?.items?.map((item) => (
                            <button key={item.id}>{item.value}</button>
                        ))}
                    </div>
                )}
                {attribute.id === "Color" && (
                    <div>
                        <p>{attribute.id}:</p>
                        {attribute?.items?.map((item) => (
                            <button
                                key={item.id}
                                style={{ backgroundColor: item.value }}
                            >
                                TEXT
                            </button>
                        ))}
                    </div>
                )}
                {attribute.id === "Capacity" && (
                    <div>
                        <p>{attribute.id}:</p>
                        {attribute?.items?.map((item) => (
                            <button key={item.id}>{item.value}</button>
                        ))}
                    </div>
                )}
                {(attribute.id === "With USB 3 ports" ||
                    attribute.id === "Touch ID in keyboard") && (
                    <div>
                        <p>{attribute.id}:</p>
                        {attribute?.items?.map((item) => (
                            <button key={item.id}>{item.value}</button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
