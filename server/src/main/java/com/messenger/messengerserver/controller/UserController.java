package com.messenger.messengerserver.controller;

import com.messenger.messengerserver.model.User;
import com.messenger.messengerserver.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://locahost:3000")
public class UserController {
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        User foundUser = userService.getUserById(userId);

        if (foundUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }


        return ResponseEntity.ok(foundUser);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getUsersByName(@RequestParam("name") String name) {
        List<User> users = userService.getUsersByName(name);
        if (users == null) {
            return new ResponseEntity<>("Users not found", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(users);
    }

}
