# Todo API Documentation

## Overview

The **Todo** API enables you to perform CRUD (Create, Read, Update, Delete) operations on todo items. Each todo is associated with a specific `user`, determined by the URL parameter `:user`.

---

## Endpoints

> **Base URL**: `http://localhost:3000` (this may vary depending on your configuration)

| HTTP Method | Endpoint                          | Description                                     | Example URL                                                                                      |
|-------------|-----------------------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **GET**     | `/:user/get`                      | Retrieves **all todos** for `:user`.            | `http://localhost:3000/todos/JohnDoe/get`                                                        |
| **POST**    | `/:user/post`                     | Creates a **new todo** for `:user`.             | `http://localhost:3000/todos/JohnDoe/post`                                                       |
| **PUT**     | `/:user/put/:todoId`              | **Updates** an existing todo by `:todoId`.      | `http://localhost:3000/todos/JohnDoe/put/64bd423609f8a2ecbba6cc10`                               |
| **DELETE**  | `/:user/delete/:todoId`           | **Deletes** an existing todo by `:todoId`.      | `http://localhost:3000/todos/JohnDoe/delete/64bd423609f8a2ecbba6cc10`                            |

### Path Parameters

1. **`:user`**  
   - A string that identifies **you** (e.g., `JohnDoe` or a unique nickname if `JohnDoe` is taken).  
   - Use **the same** user string in all requests you make so your data remains consistent.

2. **`:todoId`**  
   - The **unique** MongoDB ObjectId associated with a specific todo.  
   - Needed for **PUT** and **DELETE** requests to target the correct todo.

---

## Data Model

### Schema

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
```

**Field Descriptions**:

- **`task`** (`String`, *required*): A brief description of the task.  
- **`dueDate`** (`Date`, *required*): The date by which the task should be completed (e.g., `YYYY-MM-DD`).  
- **`user`** (`String`, *required*): Automatically set by the `:user` route parameter.  

---

## Expected Request Bodies

When you **create** or **update** a todo (POST or PUT), include the following in the request body:

```plaintext
{
  "task": "some description",
  "dueDate": "2025-01-15"
}
```

The server uses `:user` from your URL to populate the `user` field automatically.

---

## How to Use in Your Frontend

1. **Base Path**: Your requests will typically be made to something like  
   ```
   http://localhost:3000/todos/:user/...
   ```
2. **User Parameter**: Replace `:user` with your own unique identifier (e.g., `JohnDoe`).  
3. **CRUD Operations**:  
   - **GET**: Fetch existing todos.  
   - **POST**: Create new todos (provide `task` and `dueDate` in the body).  
   - **PUT**: Update an existing todo (send updated `task` or `dueDate` in the body).  
   - **DELETE**: Remove a todo by its `:todoId`.  
4. **Forms in React**:  
   - Typically include fields for **`task`** and **`dueDate`**.  
   - You don’t need to include `user` in your form since that is derived from the route.

---

## Additional Notes

- **MongoDB Connection**: Ensure the backend is connected to MongoDB (local or remote).  
- **Error Handling**: If you supply invalid data (e.g., missing `task`), you may get an error response.  
- **Separation by User**: Data is distinguished by each `:user` in the URL, so make sure you always use the same user parameter in your requests to access your todos.

---

**Happy Building!** Use this documentation as a reference while you develop your React frontend that interacts with the Todo API. If you encounter any issues, consult your instructor or troubleshooting resources.# simply-todo
