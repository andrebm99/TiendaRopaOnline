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
        // Autoseed dinámico de roles si la tabla está vacía
        if (roleRepository.count() == 0) {
            roleRepository.save(new com.store.spring.app.Models.Role(com.store.spring.app.Models.RoleName.ROLE_ADMIN));
            roleRepository.save(new com.store.spring.app.Models.Role(com.store.spring.app.Models.RoleName.ROLE_VENDEDOR));
            roleRepository.save(new com.store.spring.app.Models.Role(com.store.spring.app.Models.RoleName.ROLE_CLIENTE));
        }

        // Buscar el rol de cliente en base a la enumeración para evitar IDs cableados (3 o 4)
        com.store.spring.app.Models.Role clientRole = roleRepository.findAll().stream()
                .filter(r -> r.getName() == com.store.spring.app.Models.RoleName.ROLE_CLIENTE)
                .findFirst()
                .orElse(null);

        if (clientRole == null) {
            clientRole = roleRepository.save(new com.store.spring.app.Models.Role(com.store.spring.app.Models.RoleName.ROLE_CLIENTE));
        }

        if (user.getRole() == null || user.getRole().getId() == null) {
            user.setRole(clientRole);
        } else {
            var requestedRole = roleRepository.findById(user.getRole().getId()).orElse(null);
            if (requestedRole == null) {
                user.setRole(clientRole);
            } else {
                user.setRole(requestedRole);
            }
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
            if (user.getDireccionesJson() != null) {
                existingUser.setDireccionesJson(user.getDireccionesJson());
            }
            if (user.getMetodosPagoJson() != null) {
                existingUser.setMetodosPagoJson(user.getMetodosPagoJson());
            }
            if (user.getWishlistJson() != null) {
                existingUser.setWishlistJson(user.getWishlistJson());
            }
            return repository.save(existingUser);
        }).orElse(null);
    }
}