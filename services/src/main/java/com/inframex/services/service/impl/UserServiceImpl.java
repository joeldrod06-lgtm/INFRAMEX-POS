package com.inframex.services.service.impl;

import com.inframex.repositories.response.UserResponse;
import com.inframex.services.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public UserResponse hello() {
        return new UserResponse("Hola mundo desde SERVICE");
    }
}
