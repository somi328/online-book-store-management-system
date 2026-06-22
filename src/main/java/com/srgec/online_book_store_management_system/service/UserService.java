package com.srgec.online_book_store_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srgec.online_book_store_management_system.model.User;
import com.srgec.online_book_store_management_system.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User registerUser(User user) {
        return repository.save(user);
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User getUserById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }
}