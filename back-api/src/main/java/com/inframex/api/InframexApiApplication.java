package com.inframex.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.inframex")
public class InframexApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(InframexApiApplication.class, args);
    }
}
