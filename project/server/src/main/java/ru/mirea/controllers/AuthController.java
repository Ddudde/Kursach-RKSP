package ru.mirea.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.User;
import ru.mirea.data.UserRepository;
import ru.mirea.data.json.Role;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private Gson gson;

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post!");
        System.out.println(data);
        JsonObject ans, body, bodyAns;
        ans = new JsonObject();
        ans.addProperty("error", false);
        body = null;
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
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
                        bodyAns.addProperty("secFr", !ObjectUtils.isEmpty(user.getSecFr()));
                    }
                }
                return ans;
            }
            case "chRole" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                List<User> users = userRepository.findByLogin(body.get("login").getAsString());
                if(!users.isEmpty()){
                    User user = users.get(0);
                    long curRol = body.get("role").getAsLong();
                    if(user.getRoles().containsKey(curRol)){
                        for(long i = (curRol == 4 ? 0 : curRol+1L); i < 5; i++){
                            if(!user.getRoles().containsKey(i)) continue;
                            bodyAns.addProperty("role", i);
                            Role role = user.getRoles().get(i);
                            if(role.getKids() != null && !role.getKids().isEmpty()){
                                bodyAns.addProperty("kid", role.getKids().get(0));
                                JsonObject kids = new JsonObject();
                                for(Long i1 : role.getKids()){
                                    User kid = userRepository.findById(i1).orElseThrow(RuntimeException::new);
                                    kids.addProperty(i1+"", kid.getFio());
                                }
                                bodyAns.add("kids", kids);
                            }
                            break;
                        }
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
}