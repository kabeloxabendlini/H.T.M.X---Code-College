import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// JSON file for persistence
const dataFile = path.join(__dirname, "todos.json");

// Helper: load todos
function loadTodos() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(dataFile));
  } catch (err) {
    console.error("❌ Invalid JSON, resetting file");
    fs.writeFileSync(dataFile, JSON.stringify([]));
    return [];
  }
}

// Helper: save todos
function saveTodos(todos) {
  fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
}

// Helper: render todos as HTML fragment
function renderTodos(todos) {
  return todos
    .map(
      (todo) => `
      <li class="list-group-item d-flex justify-content-between align-items-center" id="todo-${todo.id}">
        <span>${todo.task}</span>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-2"
            hx-put="/api/todos/${todo.id}"
            hx-vals='{"task": "${todo.task}"}'
            hx-prompt="Edit task:"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML">Edit</button>
          <button class="btn btn-sm btn-danger"
            hx-delete="/api/todos/${todo.id}"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML">Delete</button>
        </div>
      </li>`
    )
    .join("\n");
}

// Initialize
let todos = loadTodos();
let nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

// -------- API ROUTES --------

// Get all todos
app.get("/api/todos", (req, res) => {
  if (req.headers["hx-request"]) {
    // Return HTML fragment for htmx
    res.send(renderTodos(todos));
  } else {
    res.json(todos);
  }
});

// Add new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).send("Task is required");
  }
  const newTodo = { id: nextId++, task: task.trim() };
  todos.push(newTodo);
  saveTodos(todos);

  if (req.headers["hx-request"]) {
    res.send(renderTodos([newTodo])); // return just the new item
  } else {
    res.json(newTodo);
  }
});

// Update todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const task = req.body.task || req.query.task; // htmx sends via hx-vals
  const todo = todos.find((t) => t.id == id);

  if (!todo) return res.status(404).send("Not found");
  if (!task || task.trim() === "") return res.status(400).send("Task required");

  todo.task = task.trim();
  saveTodos(todos);

  if (req.headers["hx-request"]) {
    res.send(renderTodos([todo])); // return updated fragment
  } else {
    res.json(todo);
  }
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id != id);

  if (todos.length === initialLength) {
    return res.status(404).send("Not found");
  }
  saveTodos(todos);

  if (req.headers["hx-request"]) {
    res.send(""); // htmx will swap out the element
  } else {
    res.json({ success: true });
  }
});

// Always serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});