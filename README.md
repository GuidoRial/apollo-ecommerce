# Scandiweb Jr. React Developer TEST - Guido Rial

## How to run this project locally?

To run this project locally you need to run both the back and the front-end at the same time, so you have to:

1. Open one terminal

```
cd server
npm install
npm run build
npm start
```

2. Without closing the first terminal, open another one

```
cd client
npm install
npm start
```

## TODO

1. Cart Overlay should have a scrollbar if there are so many products it doesn't fit the screen. [HARD]

## Project Description

This project was made as part of the hiring process for Scandiweb, it took me roughly 3 weeks of work and it's meant to test my knowledge of React

## Challenges

There were three main challenges in this project

1. I didn't even know what GraphQL was when I received the instructions, so I had to dedicate at least a day to familiarize myself with its main concepts and understand why someone would choose to work with it as opposed to a REST-API
2. I haven't worked with React Class Components in months, so even if I knew what I had to do, all my experience was based on functional components so I had to re-learn class components
3. Given that I can't use functional components, useParams wasn't an option go get the productId in PDP, and all the solutions I could find online included the use of functional components as well, so I had to get creative and converted the URL object to string and trimmed everything that wasn't the productId to be able to fetch the individual products.

Besides that, I realize now how important working with Redux or some other state-management library is, as there's usually some prop-drilling going on in my projects.

## Features

1. Main Components
    - Product Listing Page (home)
    - Product Description Page
    - Header
    - Cart Page
    - Alert Message
2. Functionality
    - Ability to add or remove products from PLP (when said product doesn't have any attributes and it's in stock), PDP (when it's in stock), Cart Overlay and Cart Page.
    - Ability to see product attributes on PDP, select them and see them displayed in Cart Overlay and Cart.
    - When an attribute is meant to display color options, said color is presented properly
    - Ability to filter products by category from PLP
    - Ability to switch currencies at any time, changing PLP, PDP, Cart Overlay and Cart prices at the same time (and re-calculating total price and taxes whenever the user clicks a different currency)
    - An alert message is shown when the user adds a product to cart from PDP or PLP, when that message is still on-screen, user can't add products to cart (to avoid adding more products that needed)
    - The application is responsive in all resolutions, cart overlay doesn't fit on screen under 400px width as I didn't want to alter the original design
    - Products in cart will be stored in localStorage so that you can re-load the page without losing your cart items :)
    - Users can only add products to cart if they're in stock and all attributes are selected

## What I used

1. React
2. React Router
3. CSS
4. Apollo

## What I learned

1. React
    - How to use the React Lifecycle Methods (componentDidMount, shouldComponentUpdate, componentDidUpdate, componentWillUnmount), as I stated previously, I've only been working with functional components
    - The importance of knowing at least how to use the context API for state management
2. GraphQL
    - What GraphQL is
    - Why someone would choose to work with GraphQL
3. Apollo
    - How to make queries
