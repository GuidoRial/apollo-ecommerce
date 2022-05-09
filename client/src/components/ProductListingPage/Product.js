import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPrice } from "../../utils";
import WhiteEmptyCart from "../../Assets/Icons/WhiteEmptyCart.svg";
import Alert from "../Alert/Alert";

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
        const { item, handleAddProduct, handleSuccessAlert, successAlert } =
            this.props;
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
                            disabled={successAlert}
                            onClick={() => {
                                handleAddProduct(item, item.selectedAttributes);
                                handleSuccessAlert();
                            }}
                            className="mini-add-to-cart-button flex-justify-align"
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
                        {item.attributes.length === 0 &&
                            item.inStock &&
                            successAlert && <Alert />}
                    </div>
                </Link>
            </div>
        );
    }
}
