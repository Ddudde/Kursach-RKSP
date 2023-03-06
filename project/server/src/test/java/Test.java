import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import ru.mirea.data.SSE.TypesConnect;

import java.util.UUID;

public class Test {
    public static void main(String[] args) {
        enumsTest();
    }

    private static void enumsTest(){
//        System.out.println(TypesConnect.SCHTEACHERS == TypesConnect.HTEACHERS);
//        System.out.println(Objects.equals(TypesConnect.SCHTEACHERS.typeL1, TypesConnect.HTEACHERS.typeL1));
//        System.out.println(TypesConnect.TUTOR.typeL1 != null && Objects.equals(TypesConnect.TUTOR.typeL1, TypesConnect.PROFILES.typeL1));
//        System.out.println(TypesConnect.valueOf("hteachers")); error
        System.out.println(TypesConnect.valueOf("HTEACHERS"));
//        System.out.println(TypesConnect.valueOf("SCHTEACHERS"));
    }

    private static void getUuidFromJson(){
        JsonObject data = new JsonObject();
        data.addProperty("uuid", "bda04b06-bbe9-46d4-915e-2220890b9535");
        System.out.println(data.get("uuid").getAsString());
        System.out.println(UUID.fromString(data.get("uuid").getAsString()));
        UUID.fromString(data.get("uuid").getAsString());
    }

    private static void jsonTest1(){
        JsonObject data = new JsonObject();
        data.addProperty("type", "");
        switch (data.get("type").getAsString()){
            default -> {
                System.out.println("Error Type" + data.get("type"));
//                ans.addProperty("error", true);
//                return ans;
            }
        }
    }

    private static void jsonTest(){
        Gson g = new Gson();
//        RoleMap map = g.fromJson("{0: {YO: 4, group: 1}, 1: {YO: 8, group: 3}}", RoleMap.class);
//        System.out.println(map); //John
//        System.out.println(map.get(1L)); //John
//        System.out.println(g.toJson(map, RoleMap.class));
        JsonObject jsonObject = JsonParser.parseString("{id: 4, role: 1}").getAsJsonObject();
        System.out.println(jsonObject.get("role").getAsString());
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.configure(ALLOW_UNQUOTED_FIELD_NAMES, true);
//        mapper.configure(ALLOW_SINGLE_QUOTES, true);
//        MyMap typeRef = new MyMap();
//        MyMap map = mapper.readValue("{0: {YO: 4, group: 1}, 1: {YO: 8, group: 3}}", MyMap.class);
//        System.out.println(map);
//        System.out.println(map.get(1L));
//        System.out.println(mapper
//                .writerWithDefaultPrettyPrinter()
//                .writeValueAsString(map));
//        System.out.println(mapper
//                .writeValueAsString(map));
    }
}
