package ru.mirea.data.converters;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import ru.mirea.data.json.Role;

import javax.persistence.AttributeConverter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RoleConverter implements AttributeConverter<Map<Long, Role>, String> {

    @Autowired
    private Gson g;

    private final Type ex = new TypeToken<Map<Long,Role>>(){}.getType();

    public String convertToDatabaseColumn(Map<Long,Role> map) {
        return g.toJson(map, ex);
    }

    @Override
    public Map<Long,Role> convertToEntityAttribute(String dbData) {
        return g.fromJson(dbData, ex);
    }
}
