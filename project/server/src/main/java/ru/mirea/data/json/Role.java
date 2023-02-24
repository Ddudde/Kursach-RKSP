package ru.mirea.data.json;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role implements Serializable {
    private String email;
    private String YO;
    private String group;
}
