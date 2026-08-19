async function getUsdToEtbRate() {
    const res = await fetch(
        "https://api.frankfurter.dev/v2/rate/USD/ETB?providers=NBE"
    );

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    return data.rate;
}

getUsdToEtbRate()
    .then(rate => {
        console.log(`1 USD = ${rate} ETB`);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });