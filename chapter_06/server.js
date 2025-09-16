// Import the Express framework
import express from 'express';

const app = express();

// Middleware setup
// Serve static files from the "public" folder (e.g., CSS, JS, images)
app.use(express.static('public'));

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parse JSON data (application/json)
app.use(express.json());

/* ------------------------------
   DELETE route (HTMX request)
   ------------------------------
   - Triggered when the "Delete Profile" button is clicked
   - Responds with an alert message that replaces the profile card
-------------------------------- */
app.delete("/user/:id", (req, res) => {
  res.send(`
    <div class="alert alert-info" role="alert">
      Profile has been deleted.
    </div>
  `);
});

/* ------------------------------
   EDIT form route (HTMX request)
   ------------------------------
   - Triggered when the "Edit" button is clicked
   - Returns an HTML form pre-filled with the user's current info
   - Uses hx-put to update the profile on submit
-------------------------------- */
app.get("/user/:id/edit", (req, res) => {
  res.send(`
    <form hx-put="/user/${req.params.id}" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name"
               name="name" value="Jada Mathele">
      </div>

      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea class="form-control" id="bio" name="bio">
Daughter of Ahayah | Software Developer | Coding Trainer | Nail Technician
        </textarea>
      </div>

      <!-- Save button triggers PUT request -->
      <button type="submit" class="btn btn-primary">Save Changes</button>

      <!-- Cancel button reloads original profile card -->
      <button type="button" class="btn btn-secondary"
              hx-get="/">
        Cancel
      </button>
    </form>
  `);
});

/* ------------------------------
   PUT route (HTMX request)
   ------------------------------
   - Triggered when the user submits the edit form
   - Updates the profile with new "name" and "bio"
   - Returns the updated profile card with edit/delete buttons
-------------------------------- */
app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name || "Unknown";   // fallback if no name entered
  const bio = req.body.bio || "No bio yet."; // fallback if no bio entered
  
  res.send(`
    <div id="user-${id}" class="card" style="width: 18rem;"
         hx-target="this"
         hx-swap="outerHTML">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${bio}</p>

        <!-- Edit button (reloads form) -->
        <button class="btn btn-primary"
                hx-get="/user/${id}/edit"
                hx-target="#user-${id}"
                hx-swap="outerHTML">
          Click to Edit
        </button>

        <!-- Delete button (removes card after delete) -->
        <button class="btn btn-danger"
                hx-delete="/user/${id}"
                hx-target="#user-${id}"
                hx-swap="outerHTML"
                hx-confirm="Are you sure you want to delete this profile?">
          Delete Profile
        </button>
      </div>
    </div>
  `);
});

/* ------------------------------
   Start the server
   ------------------------------
   - Runs the Express app on port 3000
   - Console logs when the server is live
-------------------------------- */
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});