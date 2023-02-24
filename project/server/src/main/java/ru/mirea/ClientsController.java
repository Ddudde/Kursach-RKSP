package ru.mirea;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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

    private final UserRepository userRepository;

    public ClientsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    public List<User> createUser(User user) {
//        User savedUser = userRepository.save(user);
//        System.out.println(savedUser);
//        return userRepository.findAll();
//    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @RequestMapping(method = RequestMethod.POST)
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post!");
        System.out.println(data);
        JsonObject ans, body, bodyAns;
        ans = new JsonObject();
        body = null;
        if(data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        System.out.println(body);
        switch (data.get("type").getAsString()){
            case "auth" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                bodyAns.addProperty("auth", false);
                List<User> users = userRepository.findByLogin(body.get("login").getAsString());
                if(!users.isEmpty()){
                    User user = users.get(0);
                    if(Objects.equals(user.getPassword(), body.get("password").getAsString())) {
                        bodyAns.addProperty("auth", true);
                        bodyAns.addProperty("login", user.getLogin());
                        bodyAns.addProperty("role", (Long) user.getRoles().keySet().toArray()[0]);
                        bodyAns.addProperty("ico", user.getIco());
                        bodyAns.addProperty("roles", user.getRoles().size() > 1);
                    }
                }
                return ans;
            }
            default -> {
                System.out.println("Error Type" + data.get("type"));
                ans.addProperty("error", true);
                return ans;
            }
        }
    }

//    @PostMapping
    public List<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        System.out.println(savedUser);
        return userRepository.findAll();
    }

    public List<User> get(String log) {
        return userRepository.findByLogin(log);
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