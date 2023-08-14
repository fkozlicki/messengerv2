package com.messenger.messengerserver.controller;

import com.messenger.messengerserver.model.User;
import com.messenger.messengerserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("message", "User with " +
                    "this email already exists"));
        }
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        User foundUser = userService.getUserById(userId);

        if (foundUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }


        return ResponseEntity.ok(foundUser);
    }

    @PostMapping("/search")
    public ResponseEntity<?> getUsersByName(@RequestParam("name") String name) {
        List<User> users = userService.getUsersByName(name);
        if (users == null) {
            return new ResponseEntity<>("Users not found", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(users);
    }

}
