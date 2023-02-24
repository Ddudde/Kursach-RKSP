package ru.mirea.data.json;

import com.google.gson.Gson;

import javax.persistence.AttributeConverter;

public class RoleConverter implements AttributeConverter<RoleMap, String> {

    private Gson g = new Gson();

    public String convertToDatabaseColumn(RoleMap map) {
        return g.toJson(map, RoleMap.class);
    }

    @Override
    public RoleMap convertToEntityAttribute(String dbData) {
        return g.fromJson(dbData, RoleMap.class);
    }
}
