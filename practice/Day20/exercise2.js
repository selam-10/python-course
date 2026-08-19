async function fetchAndRender() {
    const output = document.querySelector("#output");

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        output.textContent = data.title;
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
}