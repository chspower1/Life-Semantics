package com.lifesimantics.hospital.controller;

import com.lifesimantics.hospital.entity.Users;
import com.lifesimantics.hospital.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Map<String, Object> logIn(@RequestBody Users.Request user) {
        return authService.loginUser(user);

    }

    @PostMapping("/register")
    public Users.Response register(@RequestBody Users.Request user){
        if(user==null) return null;

        return authService.registerUser(user);
    }

    @GetMapping("/register")
    public boolean register(@RequestParam("accountId") String accountId){

        return authService.checkAccountId(accountId);
    }

    @PostMapping("/check")
    public Map<String, Object> check(@RequestHeader("Authorization") String token){
        return authService.checkLogin(token);
    }
}
