package ru.mirea.data;

import lombok.*;
import ru.mirea.data.converters.ListConverter;
import ru.mirea.data.converters.RoleConverter;

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


    @Convert(converter = ListConverter.class)
    @Column(name = "hteachers")
    private List<Long> hteachers;

    public School(String name) {
        this.name = name;
    }
}
