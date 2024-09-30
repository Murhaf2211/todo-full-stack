
import axios from 'axios';

export interface Todo {
    id: string;
    description: string;
    status:string;
}

const API_URL = "/api/todo";  // Proxy sends it to http://localhost:8080

// Fetch all todos from the backend
export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new todo
export const addTodo = async (description: string) => {
    const response = await axios.post(API_URL, { description });
    return response.data;
};

// Delete a todo by ID
export const deleteTodo = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};

// Update a todo by ID (change description and/or done status)
export const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
};