package ru.mirea.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.Invite;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.School;
import ru.mirea.data.User;
import ru.mirea.data.json.Role;
import ru.mirea.data.reps.InviteRepository;
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

    private final InviteRepository inviteRepository;

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
                        JsonObject pep = new JsonObject();
                        schools.add("pep", pep);
                        if(!ObjectUtils.isEmpty(el.getHteachers())){
                            for(Long i1 : el.getHteachers()){
                                JsonObject htO = new JsonObject();
                                User htU = userRepository.findById(i1).orElseThrow(RuntimeException::new);
                                htO.addProperty("name", htU.getFio());
                                htO.addProperty("login", htU.getLogin());
                                pep.add(i1+"", htO);
                            }
                        }
                        if(!ObjectUtils.isEmpty(el.getHteachersInv())){
                            for(Long i1 : el.getHteachersInv()){
                                JsonObject htO = new JsonObject();
                                Invite htI = inviteRepository.findById(i1).orElseThrow(RuntimeException::new);
                                htO.addProperty("name", htI.getFio());
                                pep.add(i1+"", htO);
                            }
                        }
                        bodyAns.add(el.getId()+"", schools);
                    }
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "addSch" -> {
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
            case "remSch" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                School school = schoolRepository.findById(body.get("id").getAsLong()).orElseThrow(RuntimeException::new);
                if(user != null && user.getRoles().containsKey(4L) && school != null) {
                    schoolRepository.delete(school);
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chSch" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                School school = schoolRepository.findById(body.get("id").getAsLong()).orElseThrow(RuntimeException::new);
                if(user != null && user.getRoles().containsKey(4L) && school != null) {
                    school.setName(body.get("name").getAsString());
                    schoolRepository.save(school);
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