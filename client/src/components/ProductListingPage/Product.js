import React, { Component } from "react";
import { Link } from "react-router-dom";
import WhiteEmptyCart from "../../Assets/Icons/WhiteEmptyCart.svg";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productPrice: "",
        };
        this.filterCorrectPrice = this.filterCorrectPrice.bind(this);
    }

    componentDidMount() {
        this.filterCorrectPrice(this.props.item, this.props.selectedCurrency);
    }

    filterCorrectPrice = (item, selectedCurrency) => {
        //Take the object and the user currency preference
        const [correctPrice] = item?.prices?.filter(
            (price) => price.currency.symbol === selectedCurrency
            //Return the price that matches with the selectedCurrency
        );
        this.setState({ productPrice: correctPrice });
    };

    shouldComponentUpdate(nextProps) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            //If selectedCurrency changes, auto-update everything related to this :)
            this.filterCorrectPrice(
                this.props.item,
                nextProps.selectedCurrency
            );
        }
        return true;
    }

    render() {
        const { item, handleQuickAdd } = this.props;
        return (
            <div
                className="product-card"
                style={!item.inStock ? { opacity: "0.55" } : { opacity: "1" }}
            >
                <Link to={`/products/${item.id}`}>
                    <div className="img-container">
                        {!item.inStock && (
                            <p className="out-of-stock-sign">OUT OF STOCK</p>
                        )}
                        <img
                            src={item.gallery[0]}
                            alt="item-preview"
                            className="item-preview"
                        />
                    </div>
                </Link>
                {item.attributes.length === 0 && item.inStock && (
                    <div className="button-container">
                        <button
                            onClick={() => handleQuickAdd(item)}
                            className="mini-add-to-cart-button"
                        >
                            <img src={WhiteEmptyCart} alt="mini-cart" />
                        </button>
                    </div>
                )}
                <Link to={`/products/${item.id}`}>
                    <div>
                        <p className="brand-name">
                            {item.brand} {item.name}
                        </p>
                        <p className="product-price">
                            {this.state.productPrice?.currency?.symbol}
                            {this.state.productPrice.amount}
                        </p>
                    </div>
                </Link>
            </div>
        );
    }
}
