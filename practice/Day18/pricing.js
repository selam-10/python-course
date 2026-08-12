function withVat(amount, vatRate = 0.15) {
    return amount * (1 + vatRate);
}

function format(amount) {
    return `${amount.toFixed(2)} ETB`;
}

function total(price, qty) {
    return withVat(price * qty);
}

module.exports = {
    withVat,
    format,
    total
};