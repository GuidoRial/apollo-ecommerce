import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPrice } from "../../utils";
import WhiteEmptyCart from "../../Assets/Icons/WhiteEmptyCart.svg";
import Alert from "../Alert/Alert";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productCurrency: "",
            productPrice: 0,
            hover: false,
        };
    }

    componentDidMount() {
        let price = getPrice(
            this.props.item.prices,
            this.props.selectedCurrency
        );
        let symbol = price.currency.symbol;
        let number = price.amount.toFixed(2);
        this.setState({
            productPrice: number,
            productCurrency: symbol,
        });
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            let price = getPrice(
                this.props.item.prices,
                nextProps.selectedCurrency
            );
            let symbol = price.currency.symbol;
            let number = price.amount.toFixed(2);
            this.setState({
                productPrice: number,
                productCurrency: symbol,
            });
        }
        return true;
    }

    render() {
        const { item, handleAddProduct, handleSuccessAlert, successAlert } =
            this.props;
        const { hover, productPrice, productCurrency } = this.state;
        return (
            <div
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
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
                {hover && item.inStock && (
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
                            {productCurrency}
                            {productPrice}
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
