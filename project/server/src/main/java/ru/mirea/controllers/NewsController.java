package ru.mirea.controllers;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.mirea.data.models.News;
import ru.mirea.data.SSE.TypesConnect;
import ru.mirea.data.models.Syst;
import ru.mirea.data.models.auth.User;
import ru.mirea.data.reps.NewsRepository;
import ru.mirea.data.reps.SystemRepository;
import ru.mirea.data.reps.auth.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/news")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.66:3000"})
public class NewsController {

    private final UserRepository userRepository;

    private final AuthController authController;

    private final NewsRepository newsRepository;

    private final AdminsController adminsController;

    private final SystemRepository systemRepository;

    public void createNews(News news) {
        News savedNews = newsRepository.saveAndFlush(news);
        System.out.println(savedNews);
    }

    public List<News> getNews() {
        return newsRepository.findAll();
    }

    @PostMapping
    public JsonObject post(@RequestBody JsonObject data) {
        System.out.println("Post! " + data);
        JsonObject ans = new JsonObject(), body = null, bodyAns;
        ans.addProperty("error", false);
        if(data.has("body") && data.get("body").isJsonObject()) body = data.get("body").getAsJsonObject();
        if(!data.has("type")) data.addProperty("type", "default");
        switch (data.get("type").getAsString()){
            case "getNews" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                Syst syst = adminsController.getSyst();
                if(user != null && syst != null && !ObjectUtils.isEmpty(syst.getNews())) {
                    for(Long i1 : syst.getNews()){
                        JsonObject newsO = new JsonObject();
                        News newsU = newsRepository.findById(i1).orElseThrow(RuntimeException::new);
                        newsO.addProperty("title", newsU.getTitle());
                        newsO.addProperty("date", newsU.getDate());
                        newsO.addProperty("img_url", newsU.getImg_url());
                        newsO.addProperty("text", newsU.getText());
                        bodyAns.add(i1+"", newsO);
                    }
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "addNews" -> {
                bodyAns = new JsonObject();
                ans.add("body", bodyAns);
                User user = userRepository.findByLogin(body.get("login").getAsString());
                Syst syst = adminsController.getSyst();
                if(user != null && user.getRoles().containsKey(4L) && syst != null) {
                    News news = new News();
                    if(body.has("title")) news.setTitle(body.get("title").getAsString());
                    if(body.has("date")) news.setDate(body.get("date").getAsString());
                    if(body.has("img_url")) news.setImg_url(body.get("img_url").getAsString());
                    if(body.has("text")) news.setText(body.get("text").getAsString());
                    newsRepository.saveAndFlush(news);
                    if(syst.getNews() == null) syst.setNews(new ArrayList<>());
                    syst.getNews().add(news.getId());
                    systemRepository.saveAndFlush(syst);
                    ans.addProperty("id", news.getId());
                    bodyAns.addProperty("title", news.getTitle());
                    bodyAns.addProperty("date", news.getDate());
                    bodyAns.addProperty("img_url", news.getImg_url());
                    bodyAns.addProperty("text", news.getText());

                    authController.sendMessageForAll("addNewsC", ans, TypesConnect.NEWS, "Por");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "chNews" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                News news = newsRepository.findById(body.get("id").getAsLong()).orElse(null);
                if(user != null && user.getRoles().containsKey(4L) && news != null) {
                    switch (body.get("type").getAsString()){
                        case "title" -> news.setTitle(body.get("val").getAsString());
                        case "date" -> news.setDate(body.get("val").getAsString());
                        case "img_url" -> news.setImg_url(body.get("val").getAsString());
                        case "text" -> news.setText(body.get("val").getAsString());
                        default -> {}
                    }
                    newsRepository.saveAndFlush(news);
                    ans.add("id", body.get("id"));
                    ans.add("type", body.get("type"));
                    ans.add("val", body.get("val"));

                    authController.sendMessageForAll("chNewsC", ans, TypesConnect.NEWS, "Por");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            case "delNews" -> {
                User user = userRepository.findByLogin(body.get("login").getAsString());
                News news = newsRepository.findById(body.get("id").getAsLong()).orElse(null);
                Syst syst = adminsController.getSyst();
                if(user != null && user.getRoles().containsKey(4L) && news != null && syst != null) {
                    newsRepository.delete(news);
                    if(!ObjectUtils.isEmpty(syst.getNews())) syst.getNews().remove(news.getId());
                    systemRepository.saveAndFlush(syst);
                    ans.add("id", body.get("id"));

                    authController.sendMessageForAll("delNewsC", ans, TypesConnect.NEWS, "Por");
                } else {
                    ans.addProperty("error", true);
                }
                return ans;
            }
            default -> {
                System.out.println("Error Type" + data.get("type"));
                ans.addProperty("error", true);
                return ans;
            }
        }
    }
}