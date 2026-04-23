package com.store.spring.app.Services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.store.spring.app.Interface.UserInterface;
import com.store.spring.app.Models.User;
import com.store.spring.app.Repositories.UserRepository;

@Service
public class UserService implements UserInterface {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User createUser(User user) {
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