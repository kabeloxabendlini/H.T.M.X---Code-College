import express from 'express';   // Import Express framework

const app = express();           // Create an Express app instance

// Middleware: serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Middleware: parse URL-encoded form data (e.g., from forms)
app.use(express.urlencoded({ extended: true }));

// Middleware: parse JSON bodies in requests
app.use(express.json());

// POST endpoint for handling search requests
app.post("/search", async (req, res) => {
    // Extract the search term from request body and convert to lowercase
    const searchTerm = req.body.search.toLowerCase();

    // If no search term is entered, return an empty table row
    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    // Fetch user data from JSONPlaceholder API (mock users data)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();

    // Filter users: match if name or email contains the search term
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });

    // Map the matched users into <tr> table rows
    // join('') is used to combine all rows into a single HTML string
    const searchResultHTML = searchResults.map((user) => 
        `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`
    ).join('');

    // Send the generated HTML back to the client
    res.send(searchResultHTML);
});

// Start server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});