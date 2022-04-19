import React, { Component } from "react";
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
        const { storeItems, currentCategory, selectedCurrency } = this.props;
        //console.log(storeItems);
        return (
            <section className="product-listing-page">
                <h2>{currentCategory}</h2>
                {/* First letter mayus */}

                <div className="product-container">
                    {storeItems
                        ? storeItems.map((item) => (
                              <Product
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
