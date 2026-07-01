package com.store.spring.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.store.spring.app.Interface.UserInterface;
import com.store.spring.app.Models.User;
import com.store.spring.app.Models.Role;
import com.store.spring.app.Models.RoleName;
import com.store.spring.app.Repositories.RoleRepository;
import com.store.spring.app.Repositories.UserRepository;

@Service
public class UserService implements UserInterface {

    private final UserRepository repository;
    
    private final RoleRepository roleRepository;

    public UserService(UserRepository repository, RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User createUser(User user) {

        Role clientRole = roleRepository.findByName(RoleName.ROLE_CLIENTE)
            .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_CLIENTE))); 

        user.setRole(clientRole);

        return repository.save(user);
    }

    @Override
    public boolean deleteUser(Integer id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}