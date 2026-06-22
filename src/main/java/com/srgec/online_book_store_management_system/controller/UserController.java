package com.srgec.online_book_store_management_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.srgec.online_book_store_management_system.model.User;
import com.srgec.online_book_store_management_system.service.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return service.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {

        User existingUser = service.findByEmail(user.getEmail());

        if (existingUser != null &&
            existingUser.getPassword().equals(user.getPassword())) {

            return "Login Successful";
        }

        throw new RuntimeException("Invalid Email or Password");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "User deleted successfully";
    }
}