// backend/server.js

require('dotenv').config(); // Memuat variabel dari .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Ambil port dari .env atau default ke 5000

// Middleware
app.use(cors()); // Mengizinkan permintaan dari domain lain
app.use(express.json()); // Mengizinkan server membaca JSON dari request body

// Koneksi ke MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Definisikan Schema dan Model untuk Todo
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

// --- API Routes (CRUD Operations) ---

// 1. READ (GET all todos)
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREATE (POST a new todo)
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo); // 201 Created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request
    }
});

// 3. UPDATE (PATCH a todo)
app.patch('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (req.body.text != null) {
            todo.text = req.body.text;
        }
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE (DELETE a todo)
app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mulai server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
