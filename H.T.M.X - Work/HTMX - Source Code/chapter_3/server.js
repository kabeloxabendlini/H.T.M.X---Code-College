import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

let currentPrice = 60;

app.get("/get-price", (req, res) => {
    currentPrice = currentPrice + Math.random() * 2 - 1;
    res.send(`$${currentPrice.toFixed(1)}`);
});

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});