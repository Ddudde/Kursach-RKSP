package ru.mirea.data.reps;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.data.Request;
import ru.mirea.data.School;

public interface SchoolRepository extends JpaRepository<School, Long> {
}