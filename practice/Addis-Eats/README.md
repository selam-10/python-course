# Addis Eats 🍽️

Addis Eats is an interactive Ethiopian food ordering web application built with HTML, CSS, and JavaScript.

The application allows users to browse Ethiopian dishes, search and filter the menu, add items to a shopping cart, complete a checkout form, and view their previous orders.

## Features

- Browse Ethiopian food and drinks
- Search dishes by name
- Filter dishes by category
- View detailed food descriptions and prices
- Add dishes to the cart
- Increase or decrease item quantities
- Remove items from the cart
- Automatically calculate the cart total
- Save cart items using localStorage
- Complete a checkout form
- Validate Ethiopian phone numbers
- Generate a unique order number
- Display a detailed order confirmation
- Save order history using localStorage
- Keep previous orders after refreshing the page
- Responsive design for different screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Fetch API
- LocalStorage

## Menu Categories

The menu includes:

- Main
- Vegetarian
- Starter
- Drink

## Ethiopian Dishes

The application currently includes:

- Doro Wat
- Shiro Wat
- Beef Tibs
- Kitfo
- Vegetable Firfir
- Fasting Bayaynet
- Sambusa
- Ethiopian Coffee

Each menu item includes its price, category, image, and a description explaining the dish.

## Project Structure

```text
Addis-Eats/
│
├── index.html
├── styles.css
├── app.js
├── README.md
│
├── data/
│   └── menu.json
│
└── images/
    ├── Doro wattt.jpg
    ├── shiro.jpg
    ├── beef tibs.jpg
    ├── kitfo.jpg
    ├── firfir.jpg
    ├── beyaynet.jpg
    ├── sambusa.jpg
    └── Ethiopian coffee.jpg
    How to Run
Open the Addis Eats project in VS Code.
Make sure the data and images folders are inside the project.
Run the project using a local development server such as Live Server.
Open the application in your browser.
Browse the menu, add items to the cart, and place an order.
How It Works
Menu

The menu is loaded dynamically from data/menu.json using the JavaScript Fetch API.

Search and Filter

Users can search for dishes by name and filter dishes by category.

Shopping Cart

Users can add dishes to the cart, increase or decrease quantities, remove items, and view the automatically calculated total.

The cart is stored in the browser using localStorage, so the cart remains available after refreshing the page.

Checkout

Customers can enter:

Full name
Ethiopian phone number
Delivery address

The application validates the information before allowing the order to be placed.

Order Confirmation

After successfully placing an order, the application generates a unique order number and displays:

Customer name
Order number
Ordered items
Quantities
Total price
Phone number
Delivery address
Order History

Completed orders are saved using localStorage. Previous orders can be viewed in the Order History section and remain available after refreshing the page.

Data Storage

Addis Eats uses browser localStorage to save:

Shopping cart items
Customer orders
Order history

This allows important shopping and order information to remain available after a page refresh.

Project Goal

The goal of Addis Eats is to provide a simple, attractive, and user-friendly online food ordering experience focused on Ethiopian cuisine.

The project demonstrates practical use of HTML, CSS, JavaScript, JSON data, Fetch API, DOM manipulation, event handling, form validation, and browser localStorage.