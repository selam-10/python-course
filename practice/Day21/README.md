# Validated Persistent Signup Form

This project is a simple signup form that collects a user's full name and Ethiopian phone number.

## What It Does

The form:

* Accepts a user's name and phone number.
* Validates that the name contains at least two characters.
* Validates Ethiopian phone numbers using a regular expression.
* Shows clear error messages for invalid input.
* Saves valid signup entries to `localStorage` as JSON.
* Restores saved entries when the page is reloaded.
* Displays the number of people who have signed up.
* Handles missing or corrupted `localStorage` data safely.

## Validation

The Ethiopian phone number is checked using:

```javascript
/^(?:\+251|0)9\d{8}$/
```

This accepts phone numbers beginning with `09` or `+2519`.

## Files

* `index.html` — Contains the signup form and page structure.
* `app.js` — Contains validation, form handling, localStorage, and rendering logic.
* `README.md` — Explains the project.

## How to Open

Open `index.html` in a web browser.

## Testing

The form was tested with valid and invalid names and Ethiopian phone numbers. Valid entries remain saved after refreshing the page.
