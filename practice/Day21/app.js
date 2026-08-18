const PHONE = /^(?:\+251|0)9\d{8}$/;

const STORAGE_KEY = "signupEntries";

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorEl = document.querySelector("#error");
const countEl = document.querySelector("#count");


// ==========================
// VALIDATION
// ==========================

function validate(name, phone) {

    if (name.trim().length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone number.";
    }

    return "";
}


// ==========================
// SAVE
// ==========================

function save(entries) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(entries)
    );
}


// ==========================
// LOAD
// ==========================

function load() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {

        const entries = JSON.parse(saved);

        if (!Array.isArray(entries)) {
            return [];
        }

        return entries;

    } catch (error) {

        console.error("Could not load saved entries:", error);

        return [];
    }
}


// ==========================
// STATE
// ==========================

let entries = load();


// ==========================
// RENDER COUNT
// ==========================

function renderCount() {

    countEl.textContent =
        `${entries.length} people have signed up.`;
}


// ==========================
// FORM SUBMIT
// ==========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate(name, phone);

    if (error) {

        errorEl.textContent = error;

        return;
    }

    const entry = {
        name: name,
        phone: phone
    };

    entries.push(entry);

    save(entries);

    errorEl.textContent = "Signup successful!";

    form.reset();

    renderCount();
});


// ==========================
// START APP
// ==========================

renderCount();