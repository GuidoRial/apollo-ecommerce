import React, { Component } from "react";
import WhiteEmptyCart from "../../Assets/Icons/EmptyCart.svg";

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
        const [correctPrice] = item.prices.filter(
            (price) => price.currency.symbol === selectedCurrency
        );
        this.setState({ productPrice: correctPrice });
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.selectedCurrency !== nextProps.selectedCurrency) {
            this.filterCorrectPrice(
                this.props.item,
                nextProps.selectedCurrency
            );
        }
        return true;
    }
    render() {
        /* 
        1. Show image, title and price
            a. item.prices.filter((price)=> price.symbol === selectedCurrency)
            b. Put that into state?
        2. Change price with change in selected currency
        3. Style with positions, flex-wrap
        4. OUT OF STOCK 


        5. Add mini-cart on products without attributes
        */
        const { item, selectedCurrency } = this.props;

        //item.attributes.length === 0 && item.inStock && console.log(item);

        //console.log(item.attributes);
        //console.log(selectedCurrency);
        //console.log(this.state.productPrice);
        return (
            <div
                className="product-card"
                style={!item.inStock ? { opacity: "0.55" } : { opacity: "1" }}
            >
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
            </div>
        );
    }
}
