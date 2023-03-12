package ru.mirea.controllers;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.models.Contacts;
import ru.mirea.data.models.Syst;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.reps.ContactsRepository;
import ru.mirea.data.reps.SystemRepository;
import ru.mirea.data.reps.auth.UserRepository;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/contacts")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class ContactsController {

    private final UserRepository userRepository;

    private final AuthController authController;

    private final ContactsRepository contactsRepository;

    private final AdminsController adminsController;

    private final SystemRepository systemRepository;

    public void createContacts(Contacts contacts) {
        Contacts savedContacts = contactsRepository.saveAndFlush(contacts);
        System.out.println(savedContacts);
    }

    public List<Contacts> getContacts() {
        return contactsRepository.findAll();
    }

    @PostMapping
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post! " + data);
        JsonObject ans = new JsonObject(), body = null, bodyAns;
        ans.addProperty("error", false);
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
        switch (data.get("type").getAsString()){
            case "getContacts" -> {
                bodyAns = new JsonObject();
                JsonObject map = new JsonObject();
                ans.add("body", bodyAns);
                bodyAns.add("mapPr", map);
                User user = null;
                if(body.has("login")) user = userRepository.findByLogin(body.get("login").getAsString());
                Syst syst = adminsController.getSyst();
                if(user != null && syst != null && !ObjectUtils.isEmpty(syst.getContacts())) {
                    Contacts conM = contactsRepository.findById(syst.getContacts()).orElseThrow(RuntimeException::new);
                    bodyAns.addProperty("contact", conM.getContact());
                    map.addProperty("text", conM.getText());
                    map.addProperty("imgUrl", conM.getImgUrl());
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chContact" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                Syst syst = adminsController.getSyst();
                Contacts contacts = contactsRepository.findById(syst.getContacts()).orElseThrow(RuntimeException::new);
                if(user != null && user.getRoles().containsKey(4L) && contacts != null) {
                    String p = body.get("p").getAsString();
                    String p1 = body.has("p1") ? body.get("p1").getAsString() : null;
                    if(Objects.equals(p, "contact")) {
                        contacts.setContact(body.get("val").getAsString());
                    }
                    if(Objects.equals(p, "mapPr")) {
                        if(Objects.equals(p1, "text")) {
                            contacts.setText(body.get("val").getAsString());
                        }
                        if(Objects.equals(p1, "imgUrl")) {
                            contacts.setImgUrl(body.get("val").getAsString());
                        }
                    }
                    contactsRepository.saveAndFlush(contacts);
                    ans.add("val", body.get("val"));
                    ans.add("p", body.get("p"));
                    ans.add("p1", body.get("p1"));

                    authController.sendMessageForAll("chContactC", ans, TypesConnect.CONTACTS, "Por");
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