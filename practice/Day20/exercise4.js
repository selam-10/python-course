async function getTwoPostDetails() {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const posts = await res.json();

        const firstTwo = posts.slice(0, 2);

        const details = await Promise.all(
            firstTwo.map(async post => {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })
        );

        console.log("First two post details:");
        console.log(details);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

getTwoPostDetails();