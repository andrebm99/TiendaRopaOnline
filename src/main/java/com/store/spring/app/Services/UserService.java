package com.store.spring.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

        var clientRole = roleRepository.findById(4)
                .orElseThrow(() -> new RuntimeException("Error: El rol ROLE_CLIENT no existe en la base de datos"));

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

    @Override
    public User getUserById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(Integer id, User user) {
        return repository.findById(id).map(existingUser -> {
            if (user.getFullName() != null) {
                existingUser.setFullName(user.getFullName());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getPhoneNumber() != null) {
                existingUser.setPhoneNumber(user.getPhoneNumber());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            return repository.save(existingUser);
        }).orElse(null);
    }
}