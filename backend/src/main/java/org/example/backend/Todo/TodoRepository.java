package org.example.backend.Todo;

import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
class TodoRepository {

    private final Map<String, Todo> todos = new HashMap<>(Map.of("1", new Todo("1", "Test", TodoStatus.OPEN)));

    public List<Todo> getAll() {
        return new ArrayList<>(todos.values());
    }

    public Todo save(Todo todoToSave) {
        todos.put(todoToSave.id(), todoToSave);
        return todoToSave;
    }

    public Optional <Todo> getById(String id) {
        return Optional.ofNullable(todos.get(id));
    }

    public Todo update(Todo todo) {
        todos.put(todo.id(), todo);
        return todo;
    }

    public void delete(String id) {
        todos.remove(id);
    }
}