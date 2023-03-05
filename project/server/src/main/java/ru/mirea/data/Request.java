package ru.mirea.data;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "email")
    private String email;//title

    @Column(name = "date")
    private String date;

    @Column(name = "text")
    private String text;//FIO

    public Request(String email, String date, String text) {
        this.email = email;
        this.date = date;
        this.text = text;
    }
}
