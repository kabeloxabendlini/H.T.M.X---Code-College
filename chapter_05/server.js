// Import the Express framework
import express from 'express';

const app = express();

// Middleware setup
// Serve static files (CSS, JS, images) from the "public" folder
app.use(express.static('public'));

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON data (application/json)
app.use(express.json());

/* ------------------------------
   POST /email route
   ------------------------------
   - Triggered when the user types an email and HTMX posts it to the server
   - Validates the submitted email using a regex pattern
   - Responds with HTML that replaces the email input block
   - Shows either a success or error message inline
-------------------------------- */
app.post("/email", (req, res) => {
    const submittedEmail = req.body.email; // extract submitted email
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // If email is valid
    if(emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control"
                    name="email"
                    hx-post="/email"   <!-- HTMX posts email again on change -->
                    value="${submittedEmail}" <!-- keep user input -->
                >
                <!-- Success feedback -->
                <div class="alert alert-success" role="alert">
                    Valid email, thank you!
                </div>
          </div>    
        `);
    } else {
        // If email is invalid
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control"
                    name="email"
                    hx-post="/email"   <!-- revalidate on next input -->
                    value="${submittedEmail}" <!-- keep what user typed -->
                >
                <!-- Error feedback -->
                <div class="alert alert-danger" role="alert">
                    Invalid email, please enter a valid email address!
                </div>
          </div>     
        `);
    }
});

/* ------------------------------
   Start the server
   ------------------------------
   - Listens on port 3000
   - Logs message in console when running
-------------------------------- */
app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});