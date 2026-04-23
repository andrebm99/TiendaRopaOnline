package com.store.spring.app.Interface;

import java.util.List;
import com.store.spring.app.Models.User;

public interface UserInterface {

    List<User> getAllUsers();

    User createUser(User user);

    boolean deleteUser(Integer id);

}