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
        const [correctPrice] = item?.prices?.filter(
            (price) => price.currency.symbol === selectedCurrency
        );
        this.setState({ productPrice: correctPrice });
    };

    shouldComponentUpdate(nextProps) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            this.filterCorrectPrice(
                this.props.item,
                nextProps.selectedCurrency
            );
        }
        return true;
    }

    render() {
        const { item } = this.props;

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
                    {item.attributes.length === 0 && item.inStock && (
                        <div className="button-container">
                            <button className="mini-add-to-cart-button">
                                <img src={WhiteEmptyCart} alt="mini-cart" />
                            </button>
                        </div>
                    )}

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
