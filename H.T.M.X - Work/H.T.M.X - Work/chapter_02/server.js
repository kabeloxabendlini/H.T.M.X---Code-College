import express from "express"; // Import Express framework

const app = express(); // Create an Express app instance
const PORT = 3000;     // Define the port number

// Middleware to serve static files (like index.html, CSS, JS) from "public" folder
app.use(express.static("public"));

// Middleware to parse form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// POST route to calculate BMI
app.post("/calculate", (req, res) => {
  // Extract and convert height & weight from form inputs
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  // Validate inputs (must be positive numbers)
  if (!height || !weight || height <= 0 || weight <= 0) {
    return res.send(`
      <!-- Error screen if invalid input -->
      <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8d7da;">
        <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 400px;">
          <h2 style="color: #dc3545;">⚠ Invalid Input</h2>
          <p style="color: #555;">Please enter valid positive numbers for height and weight.</p>
          <!-- Link to go back to the form -->
          <a href="/" style="display: inline-block; margin-top: 1rem; padding: 10px 15px; background: #007BFF; color: white; text-decoration: none; border-radius: 6px;">⬅ Back</a>
        </div>
      </div>
    `);
  }

  // Formula: BMI = weight (kg) / (height * height) (m²)
  const bmi = weight / (height * height);

  // Variables to store BMI category and display color
  let category = "";
  let color = "";

  // Determine BMI category based on standard ranges
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

  // Send the BMI result as a styled HTML response
  res.send(`
    <div style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5;">
      <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.1); text-align: center; max-width: 450px;">
        <h1 style="color: #333;">📊 BMI Result</h1>
        <p style="font-size: 1.2rem;">Height: <strong>${height} m</strong></p>
        <p style="font-size: 1.2rem;">Weight: <strong>${weight} kg</strong></p>
        <p style="font-size: 1.5rem; margin: 20px 0;">Your BMI is: <strong>${bmi.toFixed(2)} kg/m²</strong></p>
        <p style="font-size: 1.3rem; color: ${color}; font-weight: bold;">Category: ${category}</p>
        <!-- Link to go back to the calculator form -->
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 15px; background: #007BFF; color: #fff; border-radius: 6px; text-decoration: none;">⬅ Back to Calculator</a>
      </div>
    </div>
  `);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});