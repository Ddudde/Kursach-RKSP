package ru.mirea.controllers;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.Main;
import ru.mirea.data.ServerService;
import ru.mirea.data.models.auth.Invite;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.models.School;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.json.Role;
import ru.mirea.data.reps.auth.InviteRepository;
import ru.mirea.data.reps.SchoolRepository;
import ru.mirea.data.reps.auth.UserRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/schools")
@NoArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class SchoolController {

    @Autowired
    private ServerService datas;

    @Autowired
    private AuthController authController;

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
                User user = datas.userByLogin(body.get("login").getAsString());
                if(user != null && user.getRoles().containsKey(4L)) {
                    for(School el : datas.getSchools()){
                        JsonObject schools = new JsonObject();
                        schools.addProperty("name", el.getName());
                        JsonObject pep = new JsonObject();
                        schools.add("pep", pep);
                        if(!ObjectUtils.isEmpty(el.getHteachers())){
                            for(Long i1 : el.getHteachers()){
                                JsonObject htO = new JsonObject();
                                User htU = datas.userById(i1);
                                htO.addProperty("name", htU.getFio());
                                htO.addProperty("login", htU.getLogin());
                                System.out.println(htU.getCode());
                                if(!ObjectUtils.isEmpty(htU.getCode())) htO.addProperty("link", htU.getCode());
                                pep.add(i1+"", htO);
                            }
                        }
                        if(!ObjectUtils.isEmpty(el.getHteachersInv())){
                            for(Long i1 : el.getHteachersInv()){
                                JsonObject htO = new JsonObject();
                                Invite htI = datas.inviteById(i1);
                                htO.addProperty("name", htI.getFio());
                                System.out.println(htI.getCode());
                                if(!ObjectUtils.isEmpty(htI.getCode())) htO.addProperty("link", htI.getCode());
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
                User user = datas.userByLogin(body.get("login").getAsString());
                if(user != null && user.getRoles().containsKey(4L)) {
                    School school = new School(body.get("name").getAsString());
                    datas.getSchoolRepository().saveAndFlush(school);
                    bodyAns.addProperty("id", school.getId());

                    JsonObject ansToCl = new JsonObject(), bod = new JsonObject();
                    ansToCl.addProperty("id", school.getId());
                    ansToCl.add("body", bod);
                    bod.addProperty("name", body.get("name").getAsString());
                    authController.sendMessageForAll("addSchC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "remSch" -> {
                User user = datas.userByLogin(body.get("login").getAsString());
                School school = datas.schoolById(body.get("id").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && school != null) {
                    datas.getSchoolRepository().delete(school);

                    JsonObject ansToCl = new JsonObject();
                    ansToCl.addProperty("id", body.get("id").getAsLong());
                    authController.sendMessageForAll("remSchC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chSch" -> {
                User user = datas.userByLogin(body.get("login").getAsString());
                School school = datas.schoolById(body.get("id").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && school != null) {
                    school.setName(body.get("name").getAsString());
                    datas.getSchoolRepository().saveAndFlush(school);

                    JsonObject ansToCl = new JsonObject();
                    ansToCl.addProperty("id", body.get("id").getAsLong());
                    ansToCl.addProperty("name", body.get("name").getAsString());
                    authController.sendMessageForAll("chSchC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "addPep" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                School sch = datas.schoolById(body.get("yo").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && sch != null) {
                    JsonObject finBody = data.get("body").getAsJsonObject();
                    Instant after = Instant.now().plus(Duration.ofDays(30));
                    Date dateAfter = Date.from(after);
                    Invite inv = new Invite(body.get("name").getAsString(), new HashMap<>(){{
                        put(finBody.get("role").getAsLong(), new Role(null, finBody.get("yo").getAsLong()));
                    }}, Main.df.format(dateAfter));
                    datas.getInviteRepository().saveAndFlush(inv);
                    if(sch.getHteachersInv() == null) sch.setHteachersInv(new ArrayList<>());
                    sch.getHteachersInv().add(inv.getId());
                    datas.getSchoolRepository().saveAndFlush(sch);
                    bodyAns.addProperty("id", inv.getId());

                    JsonObject ansToCl = new JsonObject(), bod = new JsonObject();
                    ansToCl.addProperty("id", sch.getId());
                    ansToCl.addProperty("id1", inv.getId());
                    ansToCl.add("body", bod);
                    bod.addProperty("name", body.get("name").getAsString());
                    authController.sendMessageForAll("addPepC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "remPep" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                User user1 = datas.userByLogin(body.get("id").getAsString());
                School sch = datas.schoolById(body.get("id1").getAsLong());
                Invite inv = datas.inviteById(body.get("id2").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && (user1 != null || inv != null) && sch != null) {
                    JsonObject ansToCl = new JsonObject();
                    if(user1 != null){
                        user1.getRoles().remove(3L);
                        datas.getUserRepository().saveAndFlush(user1);
                        if(!ObjectUtils.isEmpty(sch.getHteachers())) sch.getHteachers().remove(user1.getId());
                        datas.getSchoolRepository().saveAndFlush(sch);

                        ansToCl.addProperty("id1", user1.getId());
                    } else if(inv != null){
                        datas.getInviteRepository().delete(inv);
                        if(!ObjectUtils.isEmpty(sch.getHteachersInv())) sch.getHteachersInv().remove(inv.getId());
                        datas.getSchoolRepository().saveAndFlush(sch);

                        ansToCl.addProperty("id1", inv.getId());
                    }

                    ansToCl.addProperty("id", sch.getId());
                    authController.sendMessageForAll("remPepC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chPep" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                User user1 = datas.userByLogin(body.get("id").getAsString());
                School sch = datas.schoolById(body.get("id1").getAsLong());
                Invite inv = datas.inviteById(body.get("id2").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && (user1 != null || inv != null) && sch != null) {
                    JsonObject ansToCl = new JsonObject();
                    if(user1 != null){
                        user1.setFio(body.get("name").getAsString());
                        datas.getUserRepository().saveAndFlush(user1);

                        ansToCl.addProperty("id1", user1.getId());
                    } else if(inv != null){
                        inv.setFio(body.get("name").getAsString());
                        datas.getInviteRepository().saveAndFlush(inv);

                        ansToCl.addProperty("id1", inv.getId());
                    }

                    ansToCl.addProperty("id", sch.getId());
                    ansToCl.addProperty("name", body.get("name").getAsString());
                    authController.sendMessageForAll("chPepC", ansToCl, TypesConnect.HTEACHERS, "adm", "main");
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