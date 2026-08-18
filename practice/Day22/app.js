const API_URL = "https://api.frankfurter.app/latest?from=ETB";


// ==========================
// STATE
// ==========================

const state = {
    rates: {},
    watchlist: [],
    loading: false,
    error: null
};


// ==========================
// DOM ELEMENTS
// ==========================

const statusEl = document.querySelector("#status");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const resultEl = document.querySelector("#result");
const watchlistEl = document.querySelector("#watchlist");


// ==========================
// SAVE STATE
// ==========================

function saveState() {
    localStorage.setItem(
        "birrWatchState",
        JSON.stringify({
            watchlist: state.watchlist
        })
    );
}


// ==========================
// LOAD SAVED STATE
// ==========================

function loadSavedState() {
    const saved = localStorage.getItem("birrWatchState");

    if (!saved) {
        return;
    }

    try {
        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = data.watchlist;
        }
    } catch (error) {
        console.error("Could not load saved state:", error);
    }
}


// ==========================
// STATUS
// ==========================

function setStatus(message, type = "") {
    statusEl.textContent = message;
    statusEl.className = "status";

    if (type) {
        statusEl.classList.add(type);
    }
}


// ==========================
// LOAD RATES
// ==========================

async function loadRates() {

    state.loading = true;
    state.error = null;

    setStatus("Loading live exchange rates...", "loading");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
        }

        const data = await response.json();

        state.rates = data.rates;

        renderCurrencies();

        state.loading = false;

        setStatus("Live exchange rates loaded successfully.", "success");

    } catch (error) {

        state.loading = false;
        state.error = error.message;

        setStatus(
            "Could not load exchange rates. Please try again.",
            "error"
        );

        console.error(error);
    }
}


// ==========================
// RENDER CURRENCY DROPDOWN
// ==========================

function renderCurrencies() {

    currencySelect.innerHTML = `
        <option value="">Select currency</option>
    `;

    const currencies = Object.keys(state.rates).sort();

    currencies.forEach(currency => {

        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        currencySelect.appendChild(option);
    });
}


// ==========================
// CONVERT
// ==========================

function convert(event) {

    event.preventDefault();

    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    if (!amount || amount <= 0) {

        resultEl.textContent = "Please enter a valid amount.";
        return;
    }

    if (!currency) {

        resultEl.textContent = "Please select a currency.";
        return;
    }

    const rate = state.rates[currency];

    if (!rate) {

        resultEl.textContent = "Exchange rate not available.";
        return;
    }

    const convertedAmount = amount * rate;

    resultEl.textContent =
        `${amount.toFixed(2)} ETB = ${convertedAmount.toFixed(2)} ${currency}`;
}


// ==========================
// ADD TO WATCHLIST
// ==========================

function addToWatchlist(currency) {

    if (!currency) {
        return;
    }

    // Prevent duplicates
    if (state.watchlist.includes(currency)) {
        return;
    }

    state.watchlist.push(currency);

    saveState();
    renderWatchlist();
}


// ==========================
// RENDER WATCHLIST
// ==========================

function renderWatchlist() {

    watchlistEl.innerHTML = "";

    if (state.watchlist.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty";
        emptyMessage.textContent = "Your watchlist is empty.";

        watchlistEl.appendChild(emptyMessage);

        return;
    }

    state.watchlist.forEach(currency => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${currency}</span>
            <button
                type="button"
                class="delete-btn"
                data-currency="${currency}"
            >
                Delete
            </button>
        `;

        watchlistEl.appendChild(li);
    });
}


// ==========================
// WATCHLIST DELEGATION
// ==========================

watchlistEl.addEventListener("click", event => {

    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const currency = event.target.dataset.currency;

    state.watchlist = state.watchlist.filter(
        item => item !== currency
    );

    saveState();
    renderWatchlist();
});


// ==========================
// FORM SUBMIT
// ==========================

form.addEventListener("submit", convert);


// ==========================
// DOUBLE CLICK CURRENCY
// ==========================

currencySelect.addEventListener("dblclick", () => {

    const currency = currencySelect.value;

    if (currency) {
        addToWatchlist(currency);
    }
});


// ==========================
// START APP
// ==========================

loadSavedState();
renderWatchlist();
loadRates();