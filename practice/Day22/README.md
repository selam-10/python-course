Birr Watch

Birr Watch is a simple Ethiopian currency conversion web application. It loads live exchange rates for Ethiopian Birr (ETB), allows users to convert an amount of Birr into another currency, and provides a watchlist for frequently viewed currencies.

Features
Loads live exchange rates from a public API.
Converts ETB into a selected currency.
Displays loading, success, and error messages.
Allows currencies to be added to a watchlist.
Prevents duplicate currencies in the watchlist.
Allows currencies to be removed from the watchlist.
Uses localStorage to remember the watchlist after the page is refreshed.
Uses JavaScript DOM events and event delegation.
API Used

This project uses the Frankfurter exchange-rate API:

https://api.frankfurter.app/latest?from=ETB

The application fetches the latest available exchange rates with Ethiopian Birr as the base currency.

Files
index.html - Contains the structure of the application.
styles.css - Provides the page layout and styling.
app.js - Handles API requests, conversion, watchlist functionality, rendering, and localStorage.
README.md - Contains project information and instructions.
How to Run
Download or clone the project.
Open the project folder in your code editor.
Open index.html in a browser.
Wait for the live exchange rates to load.
Enter an amount in ETB.
Select a currency.
Click Convert to see the converted amount.
Click Add to Watchlist to save a currency.
Refresh the browser to confirm that the watchlist remains.