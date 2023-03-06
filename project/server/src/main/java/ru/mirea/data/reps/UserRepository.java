package ru.mirea.data.reps;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.data.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}