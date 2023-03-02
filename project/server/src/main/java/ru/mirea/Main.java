package ru.mirea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import ru.mirea.controllers.ClientsController;
import ru.mirea.data.User;
import ru.mirea.data.json.RoleMap;
import ru.mirea.data.json.Role;

import java.net.URISyntaxException;
import java.util.List;

@SpringBootApplication(exclude = { JacksonAutoConfiguration.class })
public class Main {

    private static ConfigurableApplicationContext ctx;

    public static void main(String[] args) throws URISyntaxException {
        ctx = SpringApplication.run(Main.class, args);
        ClientsController clientsController = (ClientsController)ctx.getBean("clientsController");
        System.out.println("Hello world!");
        clientsController.createUser(new User("nm1", "1111", "Петров В.В.", 2, new RoleMap() {{
            put(0L, new Role("ex@ya.ru", "#2", "11A", List.of(1L, 2L)));
            put(1L, new Role("ex@ya.ru", "#2", List.of(1L, 2L)));
            put(2L, new Role("ex@ya.ru", List.of("Англ. Яз.", "Математика"), "#2"));
            put(3L, new Role("ex@ya.ru", "#2"));
            put(4L, new Role("ex@ya.ru"));
        }}));
        clientsController.createUser(new User("nm12", "1111", "Петров В.В.", 1, new RoleMap() {{
            put(0L, new Role("ex@ya.ru", "#2", "11A", List.of(1L, 2L)));
            put(1L, new Role("ex@ya.ru", "#2", List.of(1L, 2L)));
            put(2L, new Role("ex@ya.ru", List.of("Англ. Яз.", "Математика"), "#2"));
            put(3L, new Role("ex@ya.ru", "#2"));
            put(4L, new Role("ex@ya.ru"));
        }}));
        System.out.println(clientsController.getUsers());
    }
}