package ru.mirea.data.json;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role implements Serializable {
    private String email;
    private Long YO;
    private String group;
    private List<Long> kids;
    private List<Long> parents;
    private List<String> lessons;

    public Role(String email, Long YO, String group, List<Long> parents) { // kid
        this.email = email;
        this.YO = YO;
        this.group = group;
        this.parents = parents;
    }

    public Role(String email, Long YO, List<Long> kids) { // par
        this.email = email;
        this.YO = YO;
        this.kids = kids;
    }

    public Role(String email, List<String> lessons, Long YO) { // tea
        this.email = email;
        this.YO = YO;
        this.lessons = lessons;
    }

    public Role(String email, Long YO) { //zav
        this.email = email;
        this.YO = YO;
    }

    public Role(String email) { //adm
        this.email = email;
    }
}