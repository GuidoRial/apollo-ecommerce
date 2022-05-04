import React, { Component } from "react";
import StoreContext from "../../Context/StoreContext";
import Product from "./Product";
import "./ProductListingPage.css";

export default class ProductListingPage extends Component {
    render() {
        const {
            storeItems,
            currentCategory,
            selectedCurrency,
            handleAddProduct,
        } = this.props;

        return (
            <section className="product-listing-page">
                <h2 className="current-category-text">{currentCategory}</h2>

                <div className="products-container">
                    {storeItems
                        ? storeItems.map((item) => (
                              <Product
                                  key={item.id}
                                  item={item}
                                  selectedCurrency={selectedCurrency}
                                  handleAddProduct={handleAddProduct}
                              />
                          ))
                        : "Loading..."}
                </div>
            </section>
        );
    }
}
