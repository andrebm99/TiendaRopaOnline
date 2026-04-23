package com.store.spring.app.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.store.spring.app.Models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}