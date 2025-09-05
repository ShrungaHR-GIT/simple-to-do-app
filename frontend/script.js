// frontend/script.js

let API_URL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local testing (if you ever run backend locally)
    API_URL = 'http://localhost:5001/todos';
} else if (/^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)) {
    // If accessed via public IP (like EC2 instance)
    API_URL = `http://${window.location.hostname}:5001/todos`;
} else {
    // Inside Docker network (frontend talking to backend service)
    API_URL = 'http://backend:5000/todos';
}

console.log("Using API:", API_URL);

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// --- Fungsi Bantuan ---
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to load todos. Please check if the backend server is running.');
    }
}

function displayTodos(todos) {
    todoList.innerHTML = ''; // Clear existing list
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo._id; // Store MongoDB _id for easy access

        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.textContent = todo.text;
        textSpan.addEventListener('click', () => toggleComplete(todo._id, todo.completed));

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTodo(todo._id, todo.text));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(todo._id));

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(textSpan);
        li.appendChild(actionsDiv);
        todoList.appendChild(li);
    });
}

// --- CRUD Operations ---

// CREATE Todo
addTodoBtn.addEventListener('click', async () => {
    const text = todoInput.value.trim();
    if (text === '') return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        todoInput.value = ''; // Clear input
        fetchTodos(); // Refresh list
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo.');
    }
});

// UPDATE Todo (Toggle Complete)
async function toggleComplete(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !currentStatus }) // Toggle status
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchTodos(); // Refresh list
    } catch (error) {
        console.error('Error toggling todo status:', error);
        alert('Failed to update todo status.');
    }
}

// UPDATE Todo (Edit Text)
async function editTodo(id, currentText) {
    const newText = prompt('Edit your todo:', currentText);
    if (newText === null || newText.trim() === '') return; // User cancelled or entered empty text

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newText.trim() })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchTodos(); // Refresh list
    } catch (error) {
        console.error('Error editing todo:', error);
        alert('Failed to edit todo.');
    }
}

// DELETE Todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) return; // Konfirmasi user

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchTodos(); // Refresh list
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo.');
    }
}

// Initial load of todos when the page loads
document.addEventListener('DOMContentLoaded', fetchTodos);
