import { gql } from "@apollo/client";

export const getProductsByCategory = gql`
    query getProductsByCategory($title: String!) {
        category(input: { title: $title }) {
            products {
                id
                name
                brand
                gallery
                inStock
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                category
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
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
        currencies {
            label
            symbol
        }
    }
`;

export const getProductById = gql`
    query getProductById($id: String!) {
        product(id: $id) {
            id
            brand
            name
            gallery
            inStock
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            category
            description
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
`;
