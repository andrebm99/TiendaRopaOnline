package com.store.spring.app.Services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.store.spring.app.Interface.RoleInterface;
import com.store.spring.app.Models.Role;
import com.store.spring.app.Repositories.RoleRepository;

@Service
public class RoleService implements RoleInterface {

    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Role> getAllRoles() {
        return repository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        return repository.save(role);
    }

    @Override
    public boolean deleteRole(Integer id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}