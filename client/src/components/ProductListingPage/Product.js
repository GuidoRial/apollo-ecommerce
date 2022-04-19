import React, { Component } from "react";

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
        //console.log(item);
        //console.log(selectedCurrency);
        //console.log(this.state.productPrice);
        return (
            <div>
                <img src={item.gallery[0]} alt="item-preview" />
                <h3>
                    {item.brand} {item.name}
                </h3>
                <h4>
                    {this.state.productPrice?.currency?.symbol}
                    {this.state.productPrice.amount}
                </h4>
            </div>
        );
    }
}
