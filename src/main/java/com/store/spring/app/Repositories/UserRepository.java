package com.store.spring.app.Repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.store.spring.app.Models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}