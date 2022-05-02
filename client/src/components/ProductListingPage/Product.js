import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPrice } from "../../utils";
import WhiteEmptyCart from "../../Assets/Icons/WhiteEmptyCart.svg";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productPrice: "",
        };
    }

    componentDidMount() {
        this.setState({
            productPrice: getPrice(
                this.props.item.prices,
                this.props.selectedCurrency
            ),
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            //If selectedCurrency changes, auto-update everything related to this :)
            this.setState({
                productPrice: getPrice(
                    this.props.item.prices,
                    nextProps.selectedCurrency
                ),
            });
        }
        return true;
    }

    render() {
        const { item, handleAddProduct } = this.props;
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
                            onClick={() =>
                                handleAddProduct(item, item.selectedAttributes)
                            }
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
