package ru.mirea;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.data.repository.query.Param;

import javax.persistence.*;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.TABLE)
//    @GeneratedValue(generator = "sequence-generator")
//    @GenericGenerator(
//            name = "sequence-generator",
//            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
//            parameters = {
//                    @Parameter(name = "sequence_name", value = "user_sequence"),
//                    @Parameter(name = "initial_value", value = "0"),
//                    @Parameter(name = "increment_size", value = "1")
//            }
//    )
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    public Client() {
    }

    public Client(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Client(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}