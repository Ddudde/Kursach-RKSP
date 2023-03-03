package ru.mirea.data;

import lombok.*;
import ru.mirea.data.json.RoleMap;
import ru.mirea.data.json.RoleConverter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "useer")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "pass")
    private String password;

    @Column(name = "fio")
    private String fio;

    @Column(name = "secFr")
    private String secFr;

    @Column(name = "ico")
    private int ico;

    @Convert(converter = RoleConverter.class)
    @Column(name = "roles")
    private RoleMap roles;

    @Column(name = "info")
    private String info;

    public User(String login, String password, int ico) {
        this.login = login;
        this.password = password;
        this.ico = ico;
    }

    public User(String login, String password, String fio, int ico, RoleMap roles) {
        this.login = login;
        this.fio = fio;
        this.password = password;
        this.ico = ico;
        this.roles = roles;
    }
}