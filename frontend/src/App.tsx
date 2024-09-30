// src/App.tsx
import React from 'react';
import TodoList from './components/Todolist';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar />
            <Container className="flex-grow-1">
                <TodoList />
            </Container>
            <Footer />
        </div>
    );
};

export default App;