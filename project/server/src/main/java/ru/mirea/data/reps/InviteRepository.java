package ru.mirea.data.reps;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.data.Invite;
import ru.mirea.data.School;

public interface InviteRepository extends JpaRepository<Invite, Long> {
}