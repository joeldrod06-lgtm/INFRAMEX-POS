package com.inframex.api.controller;

import com.inframex.repositories.response.UserResponse;
import com.inframex.services.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/hello")
    public UserResponse hello() {
        return userService.hello();
    }
}
