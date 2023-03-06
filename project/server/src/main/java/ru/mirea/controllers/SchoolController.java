package ru.mirea.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.School;
import ru.mirea.data.User;
import ru.mirea.data.json.Role;
import ru.mirea.data.reps.SchoolRepository;
import ru.mirea.data.reps.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/schools")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class SchoolController {

    @Autowired
    private Gson gson;

    private final UserRepository userRepository;

    private final AuthController authController;

    private final SchoolRepository schoolRepository;

    public void createSchool(School school) {
        School savedSchool = schoolRepository.save(school);
        System.out.println(savedSchool);
    }

    public List<School> getSchools() {
        return schoolRepository.findAll();
    }

    @PostMapping
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post! " + data);
        JsonObject ans = new JsonObject(), body = null, bodyAns;
        ans.addProperty("error", false);
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
        switch (data.get("type").getAsString()){
            case "getSchools" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null && user.getRoles().containsKey(4L)) {
                    for(School el : getSchools()){
                        JsonObject schools = new JsonObject();
                        schools.addProperty("name", el.getName());
                        bodyAns.add(el.getId()+"", schools);
                    }
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "addSchools" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null && user.getRoles().containsKey(4L)) {
                    School school = new School(body.get("name").getAsString());
                    schoolRepository.save(school);
                    bodyAns.addProperty("id", school.getId());
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