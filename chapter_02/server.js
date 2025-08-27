import express from "express";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  if (!height || !weight || height <= 0 || weight <= 0) {
    return res.send(`
      <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8d7da;">
        <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px;">
          <h2 style="color: #dc3545;">⚠ Invalid Input</h2>
          <p style="color: #555;">Please enter valid positive numbers for height and weight.</p>
          <a href="/" style="display: inline-block; margin-top: 1rem; padding: 10px 15px; background: #007BFF; color: white; text-decoration: none; border-radius: 6px;">⬅ Back</a>
        </div>
      </div>
    `);
  }

  const bmi = weight / (height * height);

  let category = "";
  let color = "";
  if (bmi < 18.5) {
    category = "Underweight";
    color = "#17a2b8"; // blue
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    color = "#28a745"; // green
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "#ffc107"; // yellow
  } else {
    category = "Obese";
    color = "#dc3545"; // red
  }

  res.send(`
    <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5;">
      <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.1); text-align: center; max-width: 450px;">
        <h1 style="color: #333;">📊 BMI Result</h1>
        <p style="font-size: 1.2rem;">Height: <strong>${height} m</strong></p>
        <p style="font-size: 1.2rem;">Weight: <strong>${weight} kg</strong></p>
        <p style="font-size: 1.5rem; margin: 20px 0;">Your BMI is: <strong>${bmi.toFixed(2)} kg/m²</strong></p>
        <p style="font-size: 1.3rem; color: ${color}; font-weight: bold;">Category: ${category}</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 15px; background: #007BFF; color: #fff; border-radius: 6px; text-decoration: none;">⬅ Back to Calculator</a>
      </div>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});