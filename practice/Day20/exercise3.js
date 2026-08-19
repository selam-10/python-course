async function testErrors() {
    // Test 1: Deliberately wrong URL
    try {
        const res = await fetch("https://this-url-does-not-exist-12345.com");

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        console.log(await res.json());
    } catch (error) {
        console.log("Wrong URL catch:", error.message);
    }

    // Test 2: Real URL that returns 404
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts/999999"
        );

        console.log("404 response status:", res.status);
        console.log("res.ok:", res.ok);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        console.log(await res.json());
    } catch (error) {
        console.log("404 catch:", error.message);
    }
}

testErrors();