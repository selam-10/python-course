// ==========================================
// TOTAL BY TRANSACTION TYPE
// ==========================================

export const totalByType = (transactions, type) => {

    return transactions
        .filter(transaction => transaction.type === type)
        .reduce((total, { amount }) => total + amount, 0);

};


// ==========================================
// FORMATTED RECEIPTS
// ==========================================

export const formatReceipts = (transactions) => {

    return transactions.map(({ customer, amount }) => {

        return `${customer}: ${amount.toFixed(2)} ETB`;

    });

};


// ==========================================
// TRANSACTION COUNTS
// ==========================================

export const countByType = (transactions, type) => {

    return transactions
        .filter(transaction => transaction.type === type)
        .length;

};