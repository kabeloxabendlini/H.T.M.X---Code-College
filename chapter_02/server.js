import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/calculate", (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight/(height * height);
    res.send(`
        <p>Height of ${height}m and Weight of ${weight}kg gives a BMI of ${bmi.toFixed(2)}kg/m²</p>
    `);
});

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});