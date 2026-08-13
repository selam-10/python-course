// ======================================
// CACHE ELEMENTS
// ======================================

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");


// ======================================
// ADD A ROW TO THE SHOPPING LIST
// ======================================

function addRow(name, price) {

    // Create the list item
    const li = document.createElement("li");

    // Create item information container
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    // Create item name
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.textContent = name;

    // Create item price
    const itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = `${price.toFixed(2)} ETB`;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    // Put name and price inside the information container
    itemInfo.append(itemName, itemPrice);

    // Put everything inside the list item
    li.append(itemInfo, deleteButton);

    // Store the price on the list item
    li.dataset.price = price;

    // Add the row to the list
    list.append(li);
}


// ======================================
// UPDATE TOTAL
// ======================================

function updateTotal() {

    let total = 0;

    const rows = list.querySelectorAll("li");

    rows.forEach((row) => {

        total += Number(row.dataset.price);

    });

    totalEl.textContent = `${total.toFixed(2)} ETB`;
}


// ======================================
// FORM SUBMIT
// ======================================

form.addEventListener("submit", (event) => {

    // Prevent the page from reloading
    event.preventDefault();

    // Read the values
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    // Validate both fields
    if (!name || !price || price <= 0) {

        alert("Please enter an item name and a valid price.");

        return;
    }

    // Add the item
    addRow(name, price);

    // Clear the form
    form.reset();

    // Update the total
    updateTotal();

});


// ======================================
// EVENT DELEGATION
// ======================================

list.addEventListener("click", (event) => {

    // DELETE ITEM
    if (event.target.matches(".del")) {

        const row = event.target.closest("li");

        row.remove();

        updateTotal();

    }


    // TOGGLE BOUGHT STATE
    else if (event.target.closest("li")) {

        const row = event.target.closest("li");

        row.classList.toggle("bought");

    }

});