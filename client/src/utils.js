/**
 * Iterate through both array's comparing its objects
 * User is able to add to cart only if he selected one of each attributes,
 * so the length of both arrays and order in which objects appear is always the same
 * If all objects are the same, then the user is trying to add another
 * product of the one he has in cart, therefore return true
 * @param {array} firstArray Array of user preferences (selectedAttributes)
 * @param {array} secondArray Array of possible attributes for each product
 * @returns {boolean} => true if the product the user is trying to add to cart and the one in cart has the same attributes
 */
export const allAttributesAreTheSame = (firstArray, secondArray) => {
    const objectsAreEqual = (o1, o2) =>
        Object.values(o1)[1] === Object.values(o2)[1];

    let truthyValuesCounter = 0;
    let i = 0;

    while (i < firstArray.length) {
        if (
            objectsAreEqual(firstArray[i], secondArray?.selectedAttributes[i])
        ) {
            truthyValuesCounter += 1;
        }
        i += 1;
    }

    if (truthyValuesCounter === firstArray.length) {
        return true;
    }
};

/**
 * If the user didn't send selectedAttributes (i.e: AirTag) then only look for the matching id.
 * If he did, look for an object in cart that matches the product.id and selectedAttributes
 * (user should be able to buy a blue and a black PS5 in the same session if he wanted to)
 * @param {array} cart Store cart
 * @param {object} product Object I want to see if it exists in cart or not
 * @param {array} selectedAttributes Array of selectedAttributes that come from users input
 * @returns {object} A matching item in cart
 */
export const getProductFromCart = (cart, product, selectedAttributes) => {
    let item;

    if (!selectedAttributes) {
        item = cart.find((item) => item.id === product.id);
    } else {
        let productsById = cart.filter((item) => item.id === product.id);

        productsById.forEach((product) => {
            if (allAttributesAreTheSame(selectedAttributes, product)) {
                item = product;
            }
        });
    }

    return item;
};

/**
 *  Filter the prices array and return the one that matches with the user's preferences
 * @param {array} prices Array inside of each product that comes from DB
 * @param {string} currency Selected currency that comes from user input
 * @returns Product price in the user's currency
 */
export const getPrice = (prices, currency) => {
    const [correctPrice] = prices.filter(
        (price) => price.currency.symbol === currency
    );

    return correctPrice;
};

export const taxes = [
    { amount: 15, currency: { label: "USD", symbol: "$" } },
    { amount: 11.99, currency: { label: "GBP", symbol: "£" } },
    { amount: 21.25, currency: { label: "AUD", symbol: "A$" } },
    { amount: 1952.16, currency: { label: "JPY", symbol: "¥" } },
    { amount: 1068.75, currency: { label: "RUB", symbol: "₽" } },
];
