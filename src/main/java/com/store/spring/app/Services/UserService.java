package com.store.spring.app.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.store.spring.app.Interface.UserInterface;
import com.store.spring.app.Models.User;
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

        if (user.getRole() == null || user.getRole().getId() == null) {
            var clientRole = roleRepository.findById(4)
                    .orElseThrow(() -> new RuntimeException("Error: El rol ROLE_CLIENT no existe en la base de datos"));
            user.setRole(clientRole);
        } else {
            var requestedRole = roleRepository.findById(user.getRole().getId())
                    .orElseThrow(
                            () -> new RuntimeException("Error: El rol proporcionado no existe en la base de datos"));
            user.setRole(requestedRole);
        }

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