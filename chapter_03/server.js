import express from 'express'; // Import the Express framework

const app = express(); // Create an Express application instance

// Serve static files from the "public" folder (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Middleware to parse URL-encoded form data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies (e.g., from fetch/axios/htmx)
app.use(express.json());

// Simulated Bitcoin price (starting value)
let currentPrice = 60;

// Route to get the current Bitcoin price
app.get("/get-price", (req, res) => {
    // Randomly adjust the price by ±1 to simulate fluctuations
    currentPrice = currentPrice + Math.random() * 2 - 1;

    // Send the price formatted with 1 decimal place (as a string with $ sign)
    res.send(`$${currentPrice.toFixed(1)}`);
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});