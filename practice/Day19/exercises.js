// =====================================
// EXERCISE 1
// textContent and classList.toggle
// =====================================

const title = document.querySelector("#title");

// Change the heading text
title.textContent = "Welcome to My DOM Exercises";

// Add/remove the CSS class
title.classList.toggle("highlight");


// =====================================
// EXERCISE 2
// createElement and append
// =====================================

const cities = [
    "Addis Ababa",
    "Bahir Dar",
    "Hawassa"
];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {

    // Create a new <li>
    const li = document.createElement("li");

    // Put the city name inside it
    li.textContent = city;

    // Add it to the <ul>
    cityList.append(li);

});


// =====================================
// EXERCISE 3
// Event Bubbling
// =====================================

const box = document.querySelector("#box");
const button = document.querySelector("#click-btn");


// Listener on the button
button.addEventListener("click", (event) => {

    console.log("Button listener fired");

    console.log("event.target:", event.target);

});


// Listener on the parent div
box.addEventListener("click", () => {

    console.log("Div listener fired because of event bubbling");

});


// =====================================
// EXERCISE 4
// Event Delegation
// =====================================

const items = document.querySelector("#items");


// Only ONE listener on the parent <ul>
items.addEventListener("click", (event) => {

    // Check if the clicked element is a Delete button
    if (event.target.matches(".delete")) {

        // Find the <li> containing the button
        const item = event.target.closest("li");

        // Remove that item
        item.remove();

    }

});


// =====================================
// EXERCISE 5
// Form, preventDefault, input.value,
// createElement and append
// =====================================

const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");


form.addEventListener("submit", (event) => {

    // Stop the page from reloading
    event.preventDefault();


    // Read the input value
    const value = input.value.trim();


    // Don't add an empty item
    if (!value) {
        return;
    }


    // Create a new <li>
    const li = document.createElement("li");


    // Put the input text inside the <li>
    li.textContent = value;


    // Add the <li> to the list
    itemList.append(li);


    // Clear the input field
    input.value = "";

});