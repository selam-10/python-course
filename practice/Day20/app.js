const form = document.querySelector("#searchForm");
const input = document.querySelector("#countryInput");
const out = document.querySelector("#facts");

function render(out, label, value) {
    const div = document.createElement("div");

    div.className = "fact";

    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;

    const span = document.createElement("span");
    span.textContent = value;

    div.appendChild(strong);
    div.appendChild(span);

    out.appendChild(div);
}

async function showCountry(name) {
    out.textContent = "Loading...";

    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
        );

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const [country] = await res.json();

        out.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = country.name.common;

        out.appendChild(title);

        if (country.flags && country.flags.png) {
            const flag = document.createElement("img");

            flag.className = "flag";
            flag.src = country.flags.png;
            flag.alt = `${country.name.common} flag`;

            out.appendChild(flag);
        }

        render(
            out,
            "Capital",
            country.capital ? country.capital[0] : "N/A"
        );

        render(
            out,
            "Population",
            country.population.toLocaleString()
        );

        render(
            out,
            "Region",
            country.region
        );

        const currencies = country.currencies
            ? Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol || ""})`)
                .join(", ")
            : "N/A";

        render(
            out,
            "Currencies",
            currencies
        );

    } catch (error) {
        out.textContent = error.message;
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const countryName = input.value.trim();

    if (countryName) {
        showCountry(countryName);
    }
});

showCountry("ethiopia");