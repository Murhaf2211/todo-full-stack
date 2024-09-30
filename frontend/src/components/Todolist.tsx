
import React, { useEffect, useState } from 'react';
import { addTodo, deleteTodo, Todo} from '../services/todoService';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>('');
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        const response = await axios.get("/api/todo");
        setTodos(response.data);
    };

    // Handle status change outside the edit form
    const handleStatusChange = async (todo: Todo, newStatus: string) => {
        await axios.put(`/api/todo/${todo.id}`, { ...todo, status: newStatus });
        loadTodos(); // Refresh the todos after updating
    };

    const handleEdit = (todo: Todo) => {
        setEditingTodoId(todo.id);  // Start editing mode
        setEditText(todo.description);  // Populate the text to edit
        setStatus(todo.status);  // Set the current status in the state
    };

    const handleSaveEdit = async (todo: Todo) => {
        await axios.put(`/api/todo/${todo.id}`, { ...todo, description: editText, status});
        handleStatusChange(todo, status);
        setEditingTodoId(null);
        setEditText("");
        loadTodos();
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);  // Exit edit mode without saving
    };

    const handleAddTodo = async () => {
        if (newTodo.trim() !== '') {
            await addTodo(newTodo);
            setNewTodo('');
            loadTodos();
        }
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        loadTodos();
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Todo List</h1>

            {/* Add New Todo Form */}
            <Form className="mb-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Add a new task"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleAddTodo}>
                    Add Todo
                </Button>
            </Form>
            <Row>
                {todos.map((todo) => (
                    <Col key={todo.id} md={4} className="mb-3">
                        <Card bg="light">
                            <Card.Body>
                                {editingTodoId === todo.id ? (
                                    <>
                                        {/* Edit Mode */}
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <select value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>
                                        <Button
                                            className="mt-2" variant="primary"
                                            onClick={() => handleSaveEdit(todo)}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="mt-2" variant="secondary"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* Normal Display Mode */}
                                        <Card.Title>{todo.description}</Card.Title>
                                        <Card.Text>
                                            <p>Status: {todo.status ||"PENDING"}</p>
                                        </Card.Text>
                                        <Button
                                            variant="danger"
                                            className="ms-2"
                                            onClick={() => handleDeleteTodo(todo.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="ms-2"
                                            onClick={() => handleEdit(todo)}
                                        >
                                            Edit
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TodoList;