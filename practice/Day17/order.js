// Calculate the subtotal of all prices
function subtotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}

// Create a discount function
function discountBy(rate) {
    return (amount) => amount * (1 - rate);
}

// Add VAT
function withVat(amount, vatRate = 0.15) {
    return amount * (1 + vatRate);
}

// Format amount in ETB
function toETB(amount) {
    return `${amount.toFixed(2)} ETB`;
}

// Create a receipt maker with a private order number
function makeReceiptMaker() {
    let orderNumber = 0;

    return (amount) => {
        orderNumber++;
        return `#${orderNumber}: ${toETB(amount)}`;
    };
}

// Export the functions
module.exports = {
    subtotal,
    discountBy,
    withVat,
    toETB,
    makeReceiptMaker
};