package com.inframex.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.inframex")
public class InframexBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(InframexBackApplication.class, args);
    }
}
