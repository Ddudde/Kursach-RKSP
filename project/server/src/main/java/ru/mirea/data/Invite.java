package ru.mirea.data;

import lombok.*;
import ru.mirea.data.converters.ListLongConverter;
import ru.mirea.data.converters.ListStringConverter;

import javax.persistence.*;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString
@Entity public class Invite {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "fio")
    private String fio;

    @Column(name = "code")
    private String code;

    @Column(name = "yo")
    private Long YO;

    @Column(name = "role")
    private Long role;

    @Column(name = "grp")
    private String group;

    @Convert(converter = ListLongConverter.class)
    @Column(name = "kids")
    private List<Long> kids;

    @Convert(converter = ListLongConverter.class)
    @Column(name = "parents")
    private List<Long> parents;

    @Convert(converter = ListStringConverter.class)
    @Column(name = "lessons")
    private List<String> lessons;

    public Invite(String fio, Long YO, Long role) {
        this.fio = fio;
        this.YO = YO;
        this.role = role;
    }
}