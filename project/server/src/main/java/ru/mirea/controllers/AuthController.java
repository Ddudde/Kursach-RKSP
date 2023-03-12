package ru.mirea.controllers;

import com.google.gson.JsonObject;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import ru.mirea.Main;
import ru.mirea.data.models.auth.Invite;
import ru.mirea.data.SSE.SubscriptionData;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.models.School;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.reps.auth.InviteRepository;
import ru.mirea.data.reps.SchoolRepository;
import ru.mirea.data.reps.auth.UserRepository;
import ru.mirea.data.json.Role;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class AuthController {

    private final UserRepository userRepository;

    private final InviteRepository inviteRepository;

    private final SchoolRepository schoolRepository;

    Map<UUID, SubscriptionData> subscriptions = new ConcurrentHashMap<>();

    public AuthController(UserRepository userRepository, InviteRepository inviteRepository, SchoolRepository schoolRepository) {
        this.userRepository = userRepository;
        this.inviteRepository = inviteRepository;
        this.schoolRepository = schoolRepository;
    }

    public void createUser(User user) {
        User savedUser = userRepository.saveAndFlush(user);
        System.out.println(savedUser);
    }

    public void createInvite(Invite inv) {
        Invite savedInv = inviteRepository.saveAndFlush(inv);
        System.out.println(savedInv);
    }

    public void delCodeUser(User user){
        if(user != null){
            user.setCode(null);
            user.setExpDate(null);
            userRepository.saveAndFlush(user);
        }
    }

    public void delInv(Invite inv) {
        if(inv != null){
            School school = schoolRepository.findById(((Role) inv.getRole().values().toArray()[0]).getYO()).orElse(null);
            if(ObjectUtils.isEmpty(school.getHteachersInv())) {
                school.setHteachersInv(new ArrayList<>());
            }
            school.getHteachersInv().remove(inv.getId());
            schoolRepository.saveAndFlush(school);
            inviteRepository.delete(inv);
        }
    }

    public List<Invite> getInvites() {
        return inviteRepository.findAll();
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/open-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent> openSseStream() {
        Main.init();
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
            SubscriptionData subscriptionData = new SubscriptionData(fluxSink);
            subscriptions.put(uuid, subscriptionData);
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
        sendMessageForAll("ping", "test", TypesConnect.MAIN, "main");
    }

    public void sendMessageForAll(String evName, Object data, TypesConnect type, String podType) {
        ServerSentEvent<Object> event = ServerSentEvent
                .builder()
                .event(evName)
                .data(data)
                .build();
        subscriptions.forEach((uuid, subscriptionData) -> {
                if ((type == TypesConnect.MAIN || Objects.equals(type, subscriptionData.getType()))
                 && (Objects.equals(podType, "main") || Objects.equals(podType, subscriptionData.getPodType()))) {
                    try {
                        subscriptionData.getFluxSink().next(event);
                    } catch (Error e) {
                        subscriptions.remove(uuid);
                        System.out.println("subscription " + uuid + " was closed from Ping");
                    }
                }
            }
        );
    }

    public void sendMessageByLogin(String login) {
        ServerSentEvent<String> event = ServerSentEvent
            .builder("sdf")
            .build();
        subscriptions.forEach((uuid, subscriptionData) -> {
                if (Objects.equals(login, subscriptionData.getLogin())) {
                    subscriptionData.getFluxSink().next(event);
                }
            }
        );
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
                                .setPodType(body.get("podType").getAsString());
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
                User user = userRepository.findByLogin(body.get("login").getAsString());
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
                User user = userRepository.findByLogin(body.get("login").getAsString());
                Invite inv = null;
                User user1 = null;
                if(Objects.equals(body.get("mod").getAsString(), "inv")){
                    inv = inviteRepository.findByCode(body.get("code").getAsString());
                }
                if(Objects.equals(body.get("mod").getAsString(), "rea")){
                    user1 = userRepository.findByCode(body.get("code").getAsString());
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
                        userRepository.saveAndFlush(user);
                        School school = schoolRepository.findById(((Role) inv.getRole().values().toArray()[0]).getYO()).orElse(null);
                        if(ObjectUtils.isEmpty(school.getHteachersInv())) school.setHteachersInv(new ArrayList<>());
                        if(ObjectUtils.isEmpty(school.getHteachers())) school.setHteachers(new ArrayList<>());
                        school.getHteachersInv().remove(inv.getId());
                        school.getHteachers().add(user.getId());
                        schoolRepository.saveAndFlush(school);
                        inviteRepository.delete(inv);
                    }
                    if(user1 != null){
                        user1.setLogin(body.get("login").getAsString());
                        user1.setPassword(body.get("par").getAsString());
                        user1.setIco(body.get("ico").getAsInt());
                        user1.setCode(null);
                        user1.setExpDate(null);
                        userRepository.saveAndFlush(user1);
                    }
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chPass" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                if(user != null && Objects.equals(user.getSecFr(), body.get("secFr").getAsString())) {
                    user.setPassword(body.get("par").getAsString());
                    userRepository.saveAndFlush(user);
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chRole" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
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
                                User kid = userRepository.findById(i1).orElseThrow(RuntimeException::new);
                                kids.addProperty(i1+"", kid.getFio());
                            }
                            bodyAns.add("kids", kids);
                        }
                        break;
                    }
                }
                return ans;
            }
            case "checkInvCode" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                Invite inv = inviteRepository.findByCode(body.get("code").getAsString());
                if(inv == null) {
                    ans.addProperty("error", true);
                }else if (user != null) {
                    user.getRoles().putAll(inv.getRole());
                    userRepository.saveAndFlush(user);
                    School school = schoolRepository.findById(((Role) inv.getRole().values().toArray()[0]).getYO()).orElse(null);
                    if(ObjectUtils.isEmpty(school.getHteachersInv())) school.setHteachersInv(new ArrayList<>());
                    if(ObjectUtils.isEmpty(school.getHteachers())) school.setHteachers(new ArrayList<>());
                    school.getHteachersInv().remove(inv.getId());
                    school.getHteachers().add(user.getId());
                    schoolRepository.saveAndFlush(school);
                    inviteRepository.delete(inv);
                }
                return ans;
            }
            case "checkReaCode" -> {
                User user = userRepository.findByCode(body.get("code").getAsString());
                if(user == null) {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "setCodePep" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                User user1 = userRepository.findByLogin(body.get("id").getAsString());
                Invite inv = inviteRepository.findById(body.get("id1").getAsLong()).orElse(null);
                if(user != null && user.getRoles().containsKey(4L) && (user1 != null || inv != null)) {
                    UUID uuid = UUID.randomUUID();
                    Instant after = Instant.now().plus(Duration.ofDays(30));
                    Date dateAfter = Date.from(after);
                    JsonObject ansToCl = new JsonObject();
                    if(user1 != null){
                        user1.setCode(uuid.toString());
                        user1.setExpDate(Main.df.format(dateAfter));
                        userRepository.saveAndFlush(user1);

                        ansToCl.addProperty("id", user1.getId());
                    } else if(inv != null){
                        inv.setCode(uuid.toString());
                        inv.setExpDate(Main.df.format(dateAfter));
                        inviteRepository.saveAndFlush(inv);

                        ansToCl.addProperty("id", inv.getId());
                    }
                    System.out.println("setCode " + uuid);
                    bodyAns.addProperty("code", uuid.toString());

                    ansToCl.addProperty("code", uuid.toString());
                    if(body.has("id2")) ansToCl.addProperty("id1", body.get("id2").getAsLong());
                    sendMessageForAll("codPepC", ansToCl, TypesConnect.MAIN, "adm");
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