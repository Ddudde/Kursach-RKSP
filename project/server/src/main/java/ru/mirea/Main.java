package ru.mirea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.util.ObjectUtils;
import ru.mirea.controllers.*;
import ru.mirea.data.json.Role;
import ru.mirea.data.models.*;
import ru.mirea.data.models.auth.Invite;
import ru.mirea.data.models.auth.User;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

import static java.util.Arrays.asList;

@SpringBootApplication(exclude = { JacksonAutoConfiguration.class })
@EnableScheduling
public class Main {

    private static ConfigurableApplicationContext ctx;

    private static boolean ini = false;

    public static DateFormat df = new SimpleDateFormat("dd.MM.yyyy");

    public static void main(String[] args) {
        ctx = SpringApplication.run(Main.class, args);
        System.out.println("Hello world!");
    }

    public static void checkDates(){
        AuthController authC = (AuthController)ctx.getBean("authController");
        try {
            long now = df.parse(df.format(new Date())).getTime();
            for(Invite inv : authC.getInvites()){
                if(now >= df.parse(inv.getExpDate()).getTime()){
                    authC.delInv(inv);
                    System.out.println("Удалён код " + inv.getCode() + " по истечению срока действия");
                }
            }
            for(User user : authC.getUsers()){
                if(!ObjectUtils.isEmpty(user.getExpDate()) && now >= df.parse(user.getExpDate()).getTime()){
                    authC.delCodeUser(user);
                    System.out.println("Удалён код " + user.getCode() + " по истечению срока действия");
                }
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static void init(){
        if(ini) return;
        ini = true;
        AuthController authController = (AuthController)ctx.getBean("authController");
        authController.createUser(new User("nm1", "1111", "Петров В.В.", 2, new HashMap<Long,Role>() {{
            put(0L, new Role("ex@ya.ru", 5L, "11A", new ArrayList<>(asList(1L, 2L))));
            put(1L, new Role("ex@ya.ru", 5L, new ArrayList<>(asList(1L, 2L))));
            put(2L, new Role("ex@ya.ru", new ArrayList<>(asList("Англ. Яз.", "Математика")), 5L));
            put(3L, new Role("ex@ya.ru", 5L));
            put(4L, new Role("ex@ya.ru"));
        }}));
        authController.createUser(new User("nm12", "1111", "Петров В.В.", 1, new HashMap<Long,Role>() {{
            put(0L, new Role("ex@ya.ru", 6L, "11A", new ArrayList<>(asList(1L, 2L))));
            put(1L, new Role("ex@ya.ru", 6L, new ArrayList<>(asList(1L, 2L))));
            put(2L, new Role("ex@ya.ru", new ArrayList<>(asList("Англ. Яз.", "Математика")), 6L));
            put(3L, new Role("ex@ya.ru", 6L));
            put(4L, new Role("ex@ya.ru"));
        }}));
        System.out.println(authController.getUsers());
        RequestController requestController = (RequestController)ctx.getBean("requestController");
        requestController.createReq(new Request("ex@ya.ru","11.11.2022", "Всем своим дружным коллективом мы остановились на данном варианте."));
        System.out.println(requestController.getRequests());
        SchoolController schoolController = (SchoolController)ctx.getBean("schoolController");
        schoolController.createSchool(new School("Школа", new ArrayList<>(asList(7L, 8L))));
        schoolController.createSchool(new School(new ArrayList<>(asList(1L)), "Гимназия", new ArrayList<>(asList(9L))));
        schoolController.createSchool(new School("Лицей", new ArrayList<>(asList(2L))));
        System.out.println(schoolController.getSchools());
        authController.createUser(new User("nm13", "1111", "Петров В.В.", 2, new HashMap<Long,Role>() {{
            put(3L, new Role("ex@ya.ru", 4L));
        }}));
        authController.createUser(new User("nm14", "1111", "Петров В.В.", 2, new HashMap<Long,Role>() {{
            put(3L, new Role("ex@ya.ru", 4L));
        }}));
        Instant after = Instant.now().plus(Duration.ofDays(30));
        Date dateAfter = Date.from(after);
        authController.createInvite(new Invite("Петров А.А.", new HashMap<>(){{
            put(3L, new Role(null, 5L));
        }}, df.format(dateAfter)));
        System.out.println(authController.getInvites());
        checkDates();
        System.out.println(authController.getInvites());
        AdminsController adminsController = (AdminsController)ctx.getBean("adminsController");
        adminsController.createSyst(new Syst(new ArrayList<>(asList(1L, 2L)), new ArrayList<>(asList(11L, 12L)), 13L));
        System.out.println(adminsController.getSyst());
        NewsController newsController = (NewsController)ctx.getBean("newsController");
        newsController.createNews(new News("День рождения портала!","25.04.2022", "Начались первые работы"));
        newsController.createNews(new News("А проект вышел большим...","02.12.2022", "/media/tuman.jpg", "Да-да, всё ещё не конец..."));
        System.out.println(newsController.getNews());
        ContactsController contactsController = (ContactsController)ctx.getBean("contactsController");
        contactsController.createContacts(new Contacts(
                "8 (800) 555 35 37\n5 (353) 555 00 88",
                "Ближайшие станции метро:\nАлександровский сад, 610 м (Филёвская линия, выход 5)\nБиблиотека им. Ленина, 680 м (Сокольническая линия, выход 3)\nАрбатская, 750 м (Арбатско-Покровская линия, выход 8)",
                "/media/map.jpg"));
        System.out.println(contactsController.getContacts());
    }
}