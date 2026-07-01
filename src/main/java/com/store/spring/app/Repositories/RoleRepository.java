package com.store.spring.app.Repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.store.spring.app.Models.Role;
import com.store.spring.app.Models.RoleName;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleName name);
}