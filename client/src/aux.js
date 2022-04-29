export const allAttributesAreTheSame = (firstArray, secondArray) => {
    const objectsAreEqual = (o1, o2) =>
        Object.values(o1)[1] === Object.values(o2)[1];

    let truthyValuesCounter = 0;
    let i = 0;

    while (i < firstArray.length) {
        //Given that you can't add to cart unless you selected one attribute of each of the available ones for that product, the length of the product in cart and the one you're adding right now is always the same

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

export const getProductFromCartByProduct = (
    cart,
    product,
    selectedAttributes
) => {
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
