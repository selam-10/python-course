'use strict';

const billRaw = "480";
const bill = Number(billRaw);

const partySize = 4;

// 10% tip if bill is over 300 ETB, otherwise 5%
const tip = bill > 300 ? bill * 0.10 : bill * 0.05;

// Calculate total before service fee
const total = bill + tip;

// Payment method
const method = 'telebirr';

// Calculate service fee
let fee;

switch (method) {
    case 'telebirr':
        fee = total * 0.005;
        break;

    case 'cbebirr':
        fee = total * 0.01;
        break;

    default:
        fee = 0;
}

// Final total
const finalTotal = total + fee;

// Amount per person
const finalPerPerson = finalTotal / partySize;

// Display results
console.log(`Bill: ${bill} ETB`);
console.log(`Tip: ${tip} ETB`);
console.log(`Service fee: ${fee} ETB`);
console.log(`Final total: ${finalTotal} ETB`);
console.log(`Amount per person: ${finalPerPerson} ETB`);