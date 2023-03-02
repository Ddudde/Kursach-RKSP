package ru.mirea.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.User;
import ru.mirea.data.UserRepository;
import ru.mirea.data.json.Role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/cts")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientsController {

    @Autowired
    private Gson gson;

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