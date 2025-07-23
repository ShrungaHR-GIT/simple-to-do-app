# Simple To-Do List Application (Fullstack)

A complete To-Do List web application built from scratch to demonstrate fundamental CRUD (Create, Read, Update, Delete) operations with a separate frontend and backend.

## ✨ Features

* **Add New To-Do:** Easily create new tasks.
* **Mark as Completed:** Toggle the completion status of a To-Do item.
* **Edit To-Do:** Modify the text of an existing To-Do.
* **Delete To-Do:** Remove tasks from the list.
* **Persistent Data:** All To-Do items are stored in a MongoDB database and persist even after the browser or server is closed.

## 🚀 Technologies Used

**Frontend:**
* HTML5
* CSS3
* JavaScript (Vanilla JS for DOM manipulation and Fetch API for backend communication)

**Backend (API):**
* Node.js
* Express.js (Web Framework)
* Mongoose (MongoDB Object Data Modeling - ODM)
* CORS (Middleware for Cross-Origin Resource Sharing)
* dotenv (For environment variable management)

**Database:**
* MongoDB (NoSQL Document Database)
* MongoDB Atlas (Cloud Database Service)

## ⚙️ How to Run Locally

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
* A MongoDB database (either local [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name # Navigate into the cloned project directory

(Replace your-username/your-repo-name.git with your actual GitHub repository URL.)
```
### 2. Backend Setup

Navigate into the backend directory:

```Bash

cd backend
Install backend dependencies:
```
```Bash

npm install
Create a .env file in the backend directory and add your MongoDB connection string and port:

Code snippet

# backend/.env
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING # e.g., mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/todo_db?retryWrites=true&w=majority&appName=bramantyobj
PORT=5000
Important: Replace YOUR_MONGODB_ATLAS_CONNECTION_STRING with your actual connection string obtained from MongoDB Atlas. Make sure to update the username, password, and ensure the database name is todo_db.

Ensure your MongoDB Atlas cluster has the correct Network Access (e.g., allow access from your current IP address or 0.0.0.0/0 for testing).

Make sure you have created a Database User with the correct permissions.

Start the backend server:

Bash

node server.js
The server should now be running on http://localhost:5000 and connected to MongoDB.
```
### 3. Frontend Setup
Open the index.html file in your web browser:

```Bash

# From the main project directory
cd ../frontend
# Then open index.html directly in your browser or via a Live Server extension (if using VS Code)
You should now see the To-Do List application.
```
### 📞 Contact
```Bash
Feel free to reach out if you have any questions or feedback!

LinkedIn https://www.linkedin.com/in/bramantyobudijatmiko/

Your https://github.com/bramantyobj

Email bramantyobudi12@gmail.com

This project was created by Bramantyo Budi Jatmiko as part of learning fullstack web development.


