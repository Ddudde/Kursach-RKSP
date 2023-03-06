package ru.mirea.data.reps;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.data.Request;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
}