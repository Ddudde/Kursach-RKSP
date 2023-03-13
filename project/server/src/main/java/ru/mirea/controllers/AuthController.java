package ru.mirea.controllers;

import com.google.gson.JsonObject;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import ru.mirea.Main;
import ru.mirea.data.models.auth.Invite;
import ru.mirea.data.SSE.Subscriber;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.models.School;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.json.Role;
import ru.mirea.data.ServerService;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/auth")
@NoArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class AuthController {

    @Autowired
    private ServerService datas;

    Map<UUID, Subscriber> subscriptions = new ConcurrentHashMap<>();

    @GetMapping(path = "/open-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent> openSseStream() {
        Flux<ServerSentEvent> stream = Flux.create(fluxSink -> {
            UUID uuid = UUID.randomUUID();
            System.out.println("create subscription for " + uuid);
            fluxSink.onCancel(
                () -> {
                    subscriptions.remove(uuid);
                    System.out.println("subscription " + uuid + " was closed from onCancel");
                }
            );
            fluxSink.onDispose(
                () -> {
                    subscriptions.remove(uuid);
                    System.out.println("subscription " + uuid + " was closed from onDispose");
                }
            );
//            fluxSink.error(new Exception("test"));
            Subscriber subscriber = new Subscriber(fluxSink);
            subscriptions.put(uuid, subscriber);
            ServerSentEvent<Object> event = ServerSentEvent
                    .builder()
                    .event("connect")
                    .data(uuid)
                    .build();
            fluxSink.next(event);
        });
        return stream;
    }

    @Scheduled(cron = "*/10 * * * * *")
    public void ping(){
        sendMessageForAll("ping", "test", TypesConnect.MAIN, "main", "main");
    }

    public void sendMessageForAll(String evName, Object data, TypesConnect type, String podTypeL1, String podTypeL2) {
        ServerSentEvent<Object> event = ServerSentEvent
                .builder()
                .event(evName)
                .data(data)
                .build();
        subscriptions.forEach((uuid, subscriber) -> {
                if ((type == TypesConnect.MAIN || Objects.equals(type, subscriber.getType()))
                 && (Objects.equals(podTypeL1, "main") || Objects.equals(podTypeL1, subscriber.getPodTypeL1()))
                 && (Objects.equals(podTypeL2, "main") || Objects.equals(podTypeL2, subscriber.getPodTypeL2()))) {
                    try {
                        subscriber.getFluxSink().next(event);
                    } catch (Error e) {
                        subscriptions.remove(uuid);
                        System.out.println("subscription " + uuid + " was closed from Ping");
                    }
                }
            }
        );
    }

    public Subscriber getSubscriber(String uuid) {
        return subscriptions.get(UUID.fromString(uuid));
    }

    public void infCon(String uuid, String login, TypesConnect type, String podTypeL1, String podTypeL2){
        if(uuid != null) {
            if(login != null) {
                subscriptions.get(UUID.fromString(uuid))
                        .setLogin(login);
                System.out.println("setLog " + login + " subscription for " + uuid);
            }
            if(type != null) {
                subscriptions.get(UUID.fromString(uuid))
                        .setType(type);
                System.out.println("setType " + type + " subscription for " + uuid);
            }
            if(podTypeL1 != null) {
                subscriptions.get(UUID.fromString(uuid))
                        .setPodTypeL1(podTypeL1);
                System.out.println("setPodTypeL1 " + podTypeL1 + " subscription for " + uuid);
            }
            if(podTypeL2 != null) {
                subscriptions.get(UUID.fromString(uuid))
                        .setPodTypeL2(podTypeL2);
                System.out.println("setPodTypeL2 " + podTypeL2 + " subscription for " + uuid);
            }
        }
    }

    @PostMapping
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post! " + data);
        JsonObject ans = new JsonObject(), body = null, bodyAns;
        ans.addProperty("error", false);
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
        switch (data.get("type").getAsString()){
            case "infCon" -> {
                if(body.has("uuid")) {
                    if(body.has("login")) {
                        subscriptions.get(UUID.fromString(body.get("uuid").getAsString()))
                                .setLogin(body.get("login").getAsString());
                        System.out.println("setLog " + body.get("login").getAsString() + " subscription for " + body.get("uuid").getAsString());
                    }
                    if(body.has("type")) {
                        subscriptions.get(UUID.fromString(body.get("uuid").getAsString()))
                                .setType(TypesConnect.valueOf(body.get("type").getAsString()));
                        System.out.println("setType " + TypesConnect.valueOf(body.get("type").getAsString()) + " subscription for " + body.get("uuid").getAsString());
                    }
                    if(body.has("podType")) {
                        subscriptions.get(UUID.fromString(body.get("uuid").getAsString()))
                                .setPodTypeL1(body.get("podType").getAsString());
                        System.out.println("setPodType " + body.get("podType").getAsString() + " subscription for " + body.get("uuid").getAsString());
                    }
                }
                return ans;
            }
            case "remCon" -> {
                if(body.has("uuid")) {
                    subscriptions.remove(UUID.fromString(body.get("uuid").getAsString()));
                    System.out.println("subscription remCon " + body.get("uuid").getAsString() + " was closed");
                }
                return ans;
            }
            case "auth" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                bodyAns.addProperty("auth", false);
                User user = datas.userByLogin(body.get("login").getAsString());
                if(user != null) {
                    if(Objects.equals(user.getPassword(), body.get("password").getAsString())) {
                        bodyAns.addProperty("auth", true);
                        bodyAns.addProperty("login", user.getLogin());
//                        bodyAns.addProperty("role", ObjectUtils.isEmpty(user.getRoles()) ? 0 : ((Long) user.getRoles().keySet().toArray()[4]));
                        bodyAns.addProperty("role", ObjectUtils.isEmpty(user.getRoles()) ? 0 : ((Long) user.getRoles().keySet().toArray()[0]));
                        bodyAns.addProperty("ico", user.getIco());
                        bodyAns.addProperty("roles", !ObjectUtils.isEmpty(user.getRoles()) && user.getRoles().size() > 1);
                        bodyAns.addProperty("secFr", !ObjectUtils.isEmpty(user.getSecFr()));
                    }
                }
                return ans;
            }
            case "reg" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                Invite inv = null;
                User user1 = null;
                if(Objects.equals(body.get("mod").getAsString(), "inv")){
                    inv = datas.inviteByCode(body.get("code").getAsString());
                }
                if(Objects.equals(body.get("mod").getAsString(), "rea")){
                    user1 = datas.userByCode(body.get("code").getAsString());
                }
                if(inv == null && user1 == null){
                    ans.addProperty("error", 2);
                    return ans;
                }
                if(user == null) {
                    if(inv != null) {
                        user = new User(body.get("login").getAsString(), body.get("par").getAsString(), body.get("ico").getAsInt());
                        user.setRoles(inv.getRole());
                        user.setFio(inv.getFio());
                        datas.getUserRepository().saveAndFlush(user);
                        School school = datas.schoolById(((Role) inv.getRole().values().toArray()[0]).getYO());
                        if(ObjectUtils.isEmpty(school.getHteachersInv())) school.setHteachersInv(new ArrayList<>());
                        if(ObjectUtils.isEmpty(school.getHteachers())) school.setHteachers(new ArrayList<>());
                        school.getHteachersInv().remove(inv.getId());
                        school.getHteachers().add(user.getId());
                        datas.getSchoolRepository().saveAndFlush(school);
                        datas.getInviteRepository().delete(inv);
                    }
                    if(user1 != null){
                        user1.setLogin(body.get("login").getAsString());
                        user1.setPassword(body.get("par").getAsString());
                        user1.setIco(body.get("ico").getAsInt());
                        user1.setCode(null);
                        user1.setExpDate(null);
                        datas.getUserRepository().saveAndFlush(user1);
                    }
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chPass" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                if(user != null && Objects.equals(user.getSecFr(), body.get("secFr").getAsString())) {
                    user.setPassword(body.get("par").getAsString());
                    datas.getUserRepository().saveAndFlush(user);
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chRole" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = datas.userByLogin(body.get("login").getAsString());
                long curRol = body.get("role").getAsLong();
                if(user != null && user.getRoles().containsKey(curRol)) {
                    for(long i = (curRol == 4 ? 0 : curRol+1L); i < 5; i++){
                        if(!user.getRoles().containsKey(i)) continue;
                        bodyAns.addProperty("role", i);
                        Role role = user.getRoles().get(i);
                        if(role.getKids() != null && !role.getKids().isEmpty()){
                            bodyAns.addProperty("kid", role.getKids().get(0));
                            JsonObject kids = new JsonObject();
                            for(Long i1 : role.getKids()){
                                User kid = datas.userById(i1);
                                kids.addProperty(i1+"", kid.getFio());
                            }
                            bodyAns.add("kids", kids);
                        }
                        break;
                    }
                }
                return ans;
            }
            case "exit" -> {
                Subscriber subscriber = getSubscriber(body.get("uuid").getAsString());
                subscriber.setLogin(null);
                subscriber.setPodTypeL2(null);
                return ans;
            }
            case "checkInvCode" -> {
                User user = datas.userByLogin(body.get("login").getAsString());
                Invite inv = datas.inviteByCode(body.get("code").getAsString());
                if(inv == null) {
                    ans.addProperty("error", true);
                }else if (user != null) {
                    user.getRoles().putAll(inv.getRole());
                    datas.getUserRepository().saveAndFlush(user);
                    School school = datas.schoolById(((Role) inv.getRole().values().toArray()[0]).getYO());
                    if(ObjectUtils.isEmpty(school.getHteachersInv())) school.setHteachersInv(new ArrayList<>());
                    if(ObjectUtils.isEmpty(school.getHteachers())) school.setHteachers(new ArrayList<>());
                    school.getHteachersInv().remove(inv.getId());
                    school.getHteachers().add(user.getId());
                    datas.getSchoolRepository().saveAndFlush(school);
                    datas.getInviteRepository().delete(inv);
                }
                return ans;
            }
            case "checkReaCode" -> {
                User user = datas.userByCode(body.get("code").getAsString());
                if(user == null) {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "setCodePep" -> {
                Subscriber subscriber = getSubscriber(body.get("uuid").getAsString());
                User user = datas.userByLogin(subscriber.getLogin());
                User user1 = datas.userByLogin(body.get("id").getAsString());
                Invite inv = datas.inviteById(body.get("id1").getAsLong());
                if(user != null && user.getRoles().containsKey(4L) && (user1 != null || inv != null)) {
                    UUID uuid = UUID.randomUUID();
                    Instant after = Instant.now().plus(Duration.ofDays(30));
                    Date dateAfter = Date.from(after);
                    if(user1 != null){
                        user1.setCode(uuid.toString());
                        user1.setExpDate(Main.df.format(dateAfter));
                        datas.getUserRepository().saveAndFlush(user1);

                        ans.addProperty("id", user1.getId());
                    } else if(inv != null){
                        inv.setCode(uuid.toString());
                        inv.setExpDate(Main.df.format(dateAfter));
                        datas.getInviteRepository().saveAndFlush(inv);

                        ans.addProperty("id", inv.getId());
                    }
                    System.out.println("setCode " + uuid);

                    ans.addProperty("code", uuid.toString());
                    if(body.has("id2")) ans.addProperty("id1", body.get("id2").getAsLong());
                    sendMessageForAll("codPepC", ans, TypesConnect.MAIN, "adm", "main");
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