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
            hover: false,
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
        const { hover } = this.state;
        return (
            <div
                onMouseOver={() => this.setState({ hover: true })}
                onMouseOut={() => this.setState({ hover: false })}
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
                {item.inStock && (
                    <div
                        className="button-container"
                        onClick={() => {
                            if (item.attributes.length === 0) {
                                handleAddProduct(item, item.selectedAttributes);
                                handleSuccessAlert();
                            }
                        }}
                    >
                        <button
                            disabled={successAlert}
                            className="mini-add-to-cart-button flex-justify-align"
                        >
                            <Link
                                to={
                                    item.attributes.length !== 0
                                        ? `/products/${item.id}`
                                        : "/"
                                }
                            >
                                <img src={WhiteEmptyCart} alt="mini-cart" />
                            </Link>
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
