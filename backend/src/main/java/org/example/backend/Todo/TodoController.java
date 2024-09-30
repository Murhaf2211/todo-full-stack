package org.example.backend.Todo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo")
class TodoController {

    private final TodoService todoService;

    TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    List<Todo> getAll() {
        return todoService.getAll();
    }

    @PostMapping
    Todo postTodo(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    @GetMapping("{id}")
    Optional<Todo> getTodoById(@PathVariable String id) {
        return todoService.getById(id);
    }

    @PutMapping("/{id}")
    Todo updateTodo(@PathVariable String id, @RequestBody Todo updateTodo) {
        if (!updateTodo.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return todoService.updateTodo(id,updateTodo);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable String id) {
        todoService.delete(id);
    }
}