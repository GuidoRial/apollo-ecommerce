import { gql } from "@apollo/client";

export const getTechCategory = gql`
    query {
        category(input: { title: "tech" }) {
            name
            products {
                name
                gallery
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                inStock
            }
        }
    }
`;

export const getClothesCategory = gql`
    query {
        category(input: { title: "tech" }) {
            name
            products {
                name
                gallery
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                inStock
            }
        }
    }
`;

export const getAllProducts = gql`
    query {
        category(input: { title: "tech" }) {
            name
            products {
                name
                gallery
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                inStock
            }
        }
    }
`;

export const getCategories = gql`
    query {
        categories {
            name
        }
    }
`;

export const getCurrencies = gql`
    query {
        currencies
    }
`;
