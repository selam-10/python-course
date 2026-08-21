const menuGrid = document.getElementById("menu-grid");
const menuStatus = document.getElementById("menu-status");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

const checkoutSection = document.getElementById("checkout-section");
const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");

const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const customerAddress = document.getElementById("customer-address");

const orderConfirmation =
    document.getElementById("order-confirmation");

const orderHistory =
    document.getElementById("order-history");

const orderHistoryList =
    document.getElementById("order-history-list");

let menu = [];
let cart = [];


/* =========================
   Load Saved Cart
========================= */

function loadCart() {

    const savedCart =
        localStorage.getItem("addisEatsCart");

    if (savedCart) {

        try {
            cart = JSON.parse(savedCart);
        } catch (error) {
            cart = [];
            console.error("Could not load cart:", error);
        }
    }

    renderCart();
}


/* =========================
   Save Cart
========================= */

function saveCart() {

    localStorage.setItem(
        "addisEatsCart",
        JSON.stringify(cart)
    );
}


/* =========================
   Load Menu
========================= */

async function loadMenu() {

    try {

        menuStatus.textContent =
            "Loading menu...";

        const response =
            await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        menu = await response.json();

        displayCategories(menu);
        displayMenu(menu);

        menuStatus.textContent = "";

    } catch (error) {

        menuStatus.textContent =
            "Unable to load the menu.";

        console.error(error);
    }
}


/* =========================
   Display Categories
========================= */

function displayCategories(menu) {

    const categories = [
        ...new Set(
            menu.map(item => item.category)
        )
    ];

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.appendChild(option);
    });
}


/* =========================
   Display Menu
========================= */

function displayMenu(items) {

    menuGrid.innerHTML = "";

    if (items.length === 0) {

        menuGrid.innerHTML = `
            <div class="no-results">
                <h3>No dishes found</h3>
                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;
    }

    items.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="menu-card-content">

                <span class="category-badge">
                    ${item.category}
                </span>

                <h3>${item.name}</h3>

               <p class="food-description">
                   ${item.description}
                </p>

                <div class="menu-card-bottom">

                    <strong>
                        ${item.price.toFixed(2)} ETB
                    </strong>

                    <button
                        type="button"
                        class="add-to-cart"
                        data-id="${item.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        menuGrid.appendChild(card);
    });
}


/* =========================
   Filter Menu
========================= */

function filterMenu() {

    const selectedCategory =
        categorySelect.value;

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const filteredMenu =
        menu.filter(item => {

            const matchesCategory =
                selectedCategory === "All" ||
                item.category === selectedCategory;

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(searchTerm);

            return (
                matchesCategory &&
                matchesSearch
            );
        });

    displayMenu(filteredMenu);
}


/* =========================
   Category Filter
========================= */

categorySelect.addEventListener(
    "change",
    filterMenu
);


/* =========================
   Search
========================= */

searchInput.addEventListener(
    "input",
    filterMenu
);


/* =========================
   Add to Cart
========================= */

menuGrid.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList
                .contains("add-to-cart")
        ) {
            return;
        }

        const itemId =
            event.target.dataset.id;

        const selectedItem =
            menu.find(
                item =>
                    String(item.id) ===
                    String(itemId)
            );

        if (!selectedItem) {
            return;
        }

        const existingItem =
            cart.find(
                item =>
                    String(item.id) ===
                    String(itemId)
            );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                ...selectedItem,
                quantity: 1
            });
        }

        saveCart();
        renderCart();

        // Small visual feedback
        event.target.textContent =
            "Added ✓";

        setTimeout(() => {
            event.target.textContent =
                "Add to Cart";
        }, 700);
    }
);


/* =========================
   Render Cart
========================= */

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent =
            "0.00 ETB";

        checkoutButton.disabled = true;

        return;
    }

    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ${item.price.toFixed(2)}
                    ETB each
                </p>

                <div class="cart-controls">

                    <button
                        type="button"
                        class="quantity-button"
                        data-action="decrease"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="quantity-button"
                        data-action="increase"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        class="remove-button"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

            <strong class="item-price">
                ${itemTotal.toFixed(2)} ETB
            </strong>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent =
        itemCount;

    cartTotal.textContent =
        `${total.toFixed(2)} ETB`;

    checkoutButton.disabled = false;
}


/* =========================
   Cart Controls
========================= */

cartItems.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        const itemId =
            button.dataset.id;

        const action =
            button.dataset.action;

        const item =
            cart.find(
                item =>
                    String(item.id) ===
                    String(itemId)
            );

        if (!item) {
            return;
        }

        if (action === "increase") {
            item.quantity++;
        }

        if (action === "decrease") {

            item.quantity--;

            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        item =>
                            String(item.id) !==
                            String(itemId)
                    );
            }
        }

        if (action === "remove") {

            cart =
                cart.filter(
                    item =>
                        String(item.id) !==
                        String(itemId)
                );
        }

        saveCart();
        renderCart();
    }
);


/* =========================
   Calculate Total
========================= */

function calculateTotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price * item.quantity,
        0
    );
}


/* =========================
   Open Checkout
========================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {
            return;
        }

        checkoutSection.classList.remove(
            "hidden"
        );

        checkoutMessage.textContent = "";

        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =========================
   Generate Order Number
========================= */

function generateOrderNumber() {

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `AE-${randomNumber}`;
}


/* =========================
   Save Order
========================= */

function saveOrder(order) {

    const savedOrders =
        localStorage.getItem(
            "addisEatsOrders"
        );

    let orders = [];

    if (savedOrders) {

        try {
            orders = JSON.parse(savedOrders);
        } catch (error) {
            orders = [];
        }
    }

    orders.push(order);

    localStorage.setItem(
        "addisEatsOrders",
        JSON.stringify(orders)
    );
}


/* =========================
   Load Order History
========================= */

function loadOrderHistory() {

    const savedOrders =
        localStorage.getItem(
            "addisEatsOrders"
        );

    if (!savedOrders) {

        orderHistoryList.innerHTML = `
            <p class="empty-history">
                You have no previous orders.
            </p>
        `;

        return;
    }

    let orders = [];

    try {
        orders = JSON.parse(savedOrders);
    } catch (error) {
        orders = [];
    }

    displayOrderHistory(orders);
}


/* =========================
   Display Order History
========================= */

function displayOrderHistory(orders) {

    orderHistoryList.innerHTML = "";

    if (orders.length === 0) {

        orderHistoryList.innerHTML = `
            <p class="empty-history">
                You have no previous orders.
            </p>
        `;

        return;
    }

    // Show newest order first
    const newestFirst =
        [...orders].reverse();

    newestFirst.forEach(order => {

        const orderCard =
            document.createElement("div");

        orderCard.className =
            "order-history-card";

        const itemsHTML =
            order.items
                .map(item => `
                    <li>
                        ${item.name}
                        × ${item.quantity}
                        <span>
                            ${(item.price *
                              item.quantity)
                              .toFixed(2)} ETB
                        </span>
                    </li>
                `)
                .join("");

        orderCard.innerHTML = `
            <div class="order-history-header">

                <div>
                    <h3>
                        Order ${order.orderNumber}
                    </h3>

                    <small>
                        ${order.date}
                    </small>
                </div>

                <strong>
                    ${order.total.toFixed(2)} ETB
                </strong>

            </div>

            <ul class="order-items">
                ${itemsHTML}
            </ul>

            <p>
                <strong>Delivery:</strong>
                ${order.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${order.phone}
            </p>
        `;

        orderHistoryList.appendChild(
            orderCard
        );
    });
}


/* =========================
   Show Order Confirmation
========================= */

function showOrderConfirmation(order) {

    const itemsHTML =
        order.items
            .map(item => `
                <div class="confirmation-item">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${(item.price *
                          item.quantity)
                          .toFixed(2)} ETB
                    </strong>

                </div>
            `)
            .join("");

    orderConfirmation.innerHTML = `

        <div class="confirmation-box">

            <div class="success-icon">
                ✓
            </div>

            <h2>
                Order Placed Successfully!
            </h2>

            <p class="confirmation-thanks">
                Thank you,
                <strong>${order.customerName}</strong>!
                Your order has been placed.
            </p>

            <div class="order-number">
                <span>Order Number</span>
                <strong>
                    ${order.orderNumber}
                </strong>
            </div>

            <div class="confirmation-details">

                <h3>Your Order</h3>

                ${itemsHTML}

                <div class="confirmation-total">
                    <span>Total</span>
                    <strong>
                        ${order.total.toFixed(2)} ETB
                    </strong>
                </div>

            </div>

            <div class="delivery-details">

                <h3>Delivery Information</h3>

                <p>
                    <strong>Phone:</strong>
                    ${order.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${order.address}
                </p>

            </div>

            <button
                type="button"
                id="back-to-menu"
                class="back-menu-button"
            >
                Back to Menu
            </button>

        </div>
    `;

    orderConfirmation.classList.remove(
        "hidden"
    );

    orderConfirmation.scrollIntoView({
        behavior: "smooth"
    });

    const backButton =
        document.getElementById(
            "back-to-menu"
        );

    backButton.addEventListener(
        "click",
        () => {

            orderConfirmation.classList.add(
                "hidden"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================
   Place Order
========================= */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            customerName.value.trim();

        const phone =
            customerPhone.value.trim();

        const address =
            customerAddress.value.trim();


        /* Validation */

        if (!name || !phone || !address) {

            checkoutMessage.textContent =
                "Please fill in all fields.";

            checkoutMessage.className =
                "error-message";

            return;
        }


        /* Ethiopian phone validation */

        const phonePattern =
            /^(09\d{8}|\+2519\d{8})$/;


        if (!phonePattern.test(phone)) {

            checkoutMessage.textContent =
                "Please enter a valid Ethiopian phone number.";

            checkoutMessage.className =
                "error-message";

            return;
        }


        /* Create Order */

        const order = {

            orderNumber:
                generateOrderNumber(),

            customerName:
                name,

            phone:
                phone,

            address:
                address,

            items:
                [...cart],

            total:
                calculateTotal(),

            date:
                new Date().toLocaleString()
        };


        /* Save order */

        saveOrder(order);


        /* Show confirmation */

        showOrderConfirmation(order);


        /* Clear cart */

        cart = [];

        saveCart();

        renderCart();


        /* Reset checkout */

        checkoutForm.reset();

        checkoutMessage.textContent = "";


        /* Hide checkout */

        checkoutSection.classList.add(
            "hidden"
        );


        /* Refresh order history */

        loadOrderHistory();
    }
);


/* =========================
   Start Application
========================= */

loadMenu();
loadCart();
loadOrderHistory();