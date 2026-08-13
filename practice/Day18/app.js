// ==========================================
// IMPORT MODULES
// ==========================================

import { transactions } from "./transactions.js";

import {
    totalByType,
    formatReceipts,
    countByType
} from "./report.js";


// ==========================================
// CALCULATE TOTALS
// ==========================================

const totalCredits = totalByType(transactions, "credit");

const totalDebits = totalByType(transactions, "debit");


// ==========================================
// COUNT TRANSACTIONS
// ==========================================

const creditCount = countByType(transactions, "credit");

const debitCount = countByType(transactions, "debit");


// ==========================================
// SPREAD - UPDATE ONE TRANSACTION
// ==========================================

const originalTransaction = transactions[0];

const correctedTransaction = {
    ...originalTransaction,
    amount: 300
};


// ==========================================
// FORMAT RECEIPTS
// ==========================================

const receipts = formatReceipts(transactions);


// ==========================================
// PRINT REPORT
// ==========================================

console.log("======================================");

console.log("       TELEBIRR TRANSACTION REPORT");

console.log("======================================");

console.log("");

console.log("Total Credits:", totalCredits.toFixed(2), "ETB");

console.log("Total Debits:", totalDebits.toFixed(2), "ETB");

console.log("Credit Transactions:", creditCount);

console.log("Debit Transactions:", debitCount);

console.log("");

console.log("Formatted Receipts:");

receipts.forEach((receipt) => {
    console.log("-", receipt);
});

console.log("");

console.log("Original Transaction:");

console.log(originalTransaction);

console.log("");

console.log("Corrected Transaction:");

console.log(correctedTransaction);

console.log("");

console.log("Original transaction after update:");

console.log(originalTransaction);

console.log("");

console.log("======================================");