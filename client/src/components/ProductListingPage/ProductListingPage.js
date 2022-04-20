import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import "./ProductListingPage.css";

export default class ProductListingPage extends Component {
    constructor() {
        super();
    }
    render() {
        /* 
        Pass down:
            Category
            Products
            
        */
        const {
            storeItems,
            currentCategory,
            selectedCurrency,
            productId,
            handleProductIdChange,
        } = this.props;
        //console.log(storeItems);
        return (
            <section className="product-listing-page">
                <h2 className="current-category-text">{currentCategory}</h2>

                <div className="products-container">
                    {storeItems
                        ? storeItems.map((item) => (
                              <Product
                                  productId={productId}
                                  handleProductIdChange={handleProductIdChange}
                                  key={item.id}
                                  item={item}
                                  selectedCurrency={selectedCurrency}
                              />
                          ))
                        : "Loading..."}
                </div>
            </section>
        );
    }
}
