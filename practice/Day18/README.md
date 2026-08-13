
# TeleBirr Transaction Report

## Description

This mini-project is a small transaction report generator for an Addis shop.

It processes TeleBirr transactions using modern JavaScript features including:

- map
- filter
- reduce
- destructuring
- spread syntax
- ES modules

## Transaction Structure

Each transaction contains:

- `id`
- `customer`
- `amount`
- `type`

The transaction type can be either:

- `credit`
- `debit`

## Project Structure

### transactions.js

Contains the transaction data and exports the `transactions` array.

### report.js

Contains reusable functions for:

- Calculating totals by transaction type
- Counting transactions
- Formatting transaction receipts

### app.js

Imports the transaction data and report functions, then generates and prints the final report.

### package.json

Configures the project to use JavaScript ES modules.

## How to Run

Open a terminal inside the `mini-project` folder and run:

```bash
node app.js