package ru.mirea.controllers;

import org.springframework.web.bind.annotation.*;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.reps.auth.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/cts")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class ClientsController {

    private final UserRepository userRepository;

    public ClientsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public List<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        System.out.println(savedUser);
        return userRepository.findAll();
    }

    @PutMapping("/{id}")
    public List<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);
        System.out.println(user.getId());
        currentUser.setId(user.getId());
        currentUser.setLogin(user.getLogin());
        currentUser.setFio(user.getFio());
        currentUser = userRepository.save(user);
        System.out.println(currentUser);
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public List<User> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
}