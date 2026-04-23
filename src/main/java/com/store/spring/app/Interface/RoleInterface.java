package com.store.spring.app.Interface;

import java.util.List;
import com.store.spring.app.Models.Role;

public interface RoleInterface {

    List<Role> getAllRoles();

    Role createRole(Role role);

    boolean deleteRole(Integer id);

}