package com.inframex.back.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hola mundo desde controlador");
    }
}
