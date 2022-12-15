package ru.mirea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URISyntaxException;

@SpringBootApplication
public class Main {
    public static void main(String[] args) throws URISyntaxException {
        ClientsController clientsController = (ClientsController)SpringApplication.run(Main.class, args).getBean("clientsController");
        System.out.println("Hello world!");
        clientsController.createClient(new Client("nm1", "m@y.ru"));
        System.out.println(clientsController.getClients());
    }
}