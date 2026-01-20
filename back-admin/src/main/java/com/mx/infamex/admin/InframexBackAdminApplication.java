package com.mx.infamex.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.inframex")
public class InframexBackAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(InframexBackAdminApplication.class, args);
    }
}
