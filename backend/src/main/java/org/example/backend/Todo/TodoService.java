package org.example.backend.Todo;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
class TodoService {

    private final TodoRepository todoRepository;

    TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    List<Todo> getAll() {
        return todoRepository.getAll();
    }

    public Todo save(Todo todo) {
        String id = UUID.randomUUID().toString();

        Todo todoToSave = todo.withId(id);

        return todoRepository.save(todoToSave);
    }

    public Optional<Todo> getById(String id) {
        return todoRepository.getById(id);
    }

    public Todo updateTodo(String id, Todo updatedTodo ) {
        Todo existingTodo = todoRepository.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
        Todo newTodo = new Todo(existingTodo.id(), updatedTodo.description(), updatedTodo.status());

        // Save and return the new todo
        return todoRepository.save(newTodo);
    }

    public void delete(String id) {
        todoRepository.delete(id);
    }
}