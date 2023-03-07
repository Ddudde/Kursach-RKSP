package ru.mirea.data;

import lombok.*;
import ru.mirea.data.converters.ListLongConverter;

import javax.persistence.*;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString
@Entity public class School {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Convert(converter = ListLongConverter.class)
    @Column(name = "hteachers")
    private List<Long> hteachers;

    @Convert(converter = ListLongConverter.class)
    @Column(name = "hteachersInv")
    private List<Long> hteachersInv;

    public School(String name) {
        this.name = name;
    }

    public School(String name, List<Long> hteachers) {
        this.name = name;
        this.hteachers = hteachers;
    }

    public School(String name, List<Long> hteachers, List<Long> hteachersInv) {
        this.name = name;
        this.hteachers = hteachers;
        this.hteachersInv = hteachersInv;
    }
}
