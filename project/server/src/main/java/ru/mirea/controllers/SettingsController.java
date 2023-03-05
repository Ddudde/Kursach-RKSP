package ru.mirea.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.User;
import ru.mirea.data.UserRepository;
import ru.mirea.data.json.Role;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/settings")
@CrossOrigin(origins = "http://localhost:3000")
public class SettingsController {

    @Autowired
    private Gson gson;

    private final UserRepository userRepository;

    public SettingsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post! " + data);
        JsonObject ans = new JsonObject(), body = null, bodyAns;
        ans.addProperty("error", false);
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
        switch (data.get("type").getAsString()){
            case "chIco" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null) {
                    user.setIco(body.get("ico").getAsInt());
                    userRepository.save(user);
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chSecFR" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null) {
                    user.setSecFr(body.get("secFR").getAsString());
                    userRepository.save(user);
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chPass" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null && (body.has("secFr") || body.has("oPar"))) {
                    if(body.has("secFr") && !Objects.equals(user.getSecFr(), body.get("secFr").getAsString())){
                        ans.addProperty("error", 3);
                        return ans;
                    }
                    if(body.has("oPar") && !Objects.equals(user.getPassword(), body.get("oPar").getAsString())){
                        ans.addProperty("error", 2);
                        return ans;
                    }
                    user.setPassword(body.get("nPar").getAsString());
                    userRepository.save(user);
                } else {
                    ans.addProperty("error", true);
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
}