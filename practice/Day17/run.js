const {
    subtotal,
    discountBy,
    withVat,
    makeReceiptMaker
} = require("./order");

// Member discount = 10%
const memberDiscount = discountBy(0.10);

// Create receipt maker
const makeReceipt = makeReceiptMaker();

// First order
const order1Subtotal = subtotal(200, 150, 100);
const order1Discounted = memberDiscount(order1Subtotal);
const order1Total = withVat(order1Discounted);

console.log(makeReceipt(order1Total));

// Second order
const order2Subtotal = subtotal(300, 250);
const order2Discounted = memberDiscount(order2Subtotal);
const order2Total = withVat(order2Discounted);

console.log(makeReceipt(order2Total));