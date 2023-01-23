package com.lifesimantics.hospital.service;

import com.lifesimantics.hospital.entity.Users;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface AuthService {


    public Map<String, Object> loginUser(Users.Request request);
    public boolean registerUser(Users.Request request);

    public boolean checkAccountId(String accountId);

    public Map<String, Object> checkLogin(String token);
}
