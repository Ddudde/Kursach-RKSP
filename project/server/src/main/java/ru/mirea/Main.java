package ru.mirea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;
import ru.mirea.controllers.AuthController;
import ru.mirea.controllers.RequestController;
import ru.mirea.controllers.SchoolController;
import ru.mirea.data.Request;
import ru.mirea.data.School;
import ru.mirea.data.User;
import ru.mirea.data.json.Role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication(exclude = { JacksonAutoConfiguration.class })
@EnableScheduling
public class Main {

    private static ConfigurableApplicationContext ctx;

    private static boolean ini = false;

    public static void main(String[] args) {
        ctx = SpringApplication.run(Main.class, args);
        System.out.println("Hello world!");
    }

    public static void init(){
        if(ini) return;
        ini = true;
        AuthController authController = (AuthController)ctx.getBean("authController");
        authController.createUser(new User("nm1", "1111", "Петров В.В.", 2, new HashMap<Long,Role>() {{
            put(0L, new Role("ex@ya.ru", "#2", "11A", List.of(1L, 2L)));
            put(1L, new Role("ex@ya.ru", "#2", List.of(1L, 2L)));
            put(2L, new Role("ex@ya.ru", List.of("Англ. Яз.", "Математика"), "#2"));
            put(3L, new Role("ex@ya.ru", "#2"));
            put(4L, new Role("ex@ya.ru"));
        }}));
        authController.createUser(new User("nm12", "1111", "Петров В.В.", 1, new HashMap<Long,Role>() {{
            put(0L, new Role("ex@ya.ru", "#2", "11A", List.of(1L, 2L)));
            put(1L, new Role("ex@ya.ru", "#2", List.of(1L, 2L)));
            put(2L, new Role("ex@ya.ru", List.of("Англ. Яз.", "Математика"), "#2"));
            put(3L, new Role("ex@ya.ru", "#2"));
            put(4L, new Role("ex@ya.ru"));
        }}));
        System.out.println(authController.getUsers());
        RequestController requestController = (RequestController)ctx.getBean("requestController");
        requestController.createReq(new Request("ex@ya.ru","11.11.2022", "Всем своим дружным коллективом мы остановились на данном варианте."));
        System.out.println(requestController.getRequests());
        SchoolController schoolController = (SchoolController)ctx.getBean("schoolController");
        schoolController.createSchool(new School("Школа"));
        schoolController.createSchool(new School("Гимназия"));
        schoolController.createSchool(new School("Лицей"));
        System.out.println(schoolController.getSchools());
    }
}