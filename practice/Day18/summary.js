const { withVat, format } = require("./pricing");
const orders = require("./orders");

// Calculate the total for each order
const ordersWithTotals = orders.map((order) => {
    const total = order.items.reduce((sum, item) => {
        const { price, qty } = item;

        return sum + price * qty;
    }, 0);

    const totalWithVat = withVat(total);

    return {
        ...order,
        total: totalWithVat
    };
});

// Find orders over 500 ETB
const largeOrders = ordersWithTotals.filter((order) => {
    return order.total > 500;
});

// Calculate grand total
const grandTotal = ordersWithTotals.reduce((sum, order) => {
    return sum + order.total;
}, 0);

// Print each order
console.log("Order Summary");

ordersWithTotals.forEach((order) => {
    console.log(
        `Order #${order.id}: ${format(order.total)}`
    );
});

console.log("\nOrders over 500 ETB:");

largeOrders.forEach((order) => {
    console.log(
        `Order #${order.id}: ${format(order.total)}`
    );
});

console.log(`\nGrand Total: ${format(grandTotal)}`);