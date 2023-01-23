package com.lifesimantics.hospital.service;

import com.lifesimantics.hospital.entity.Users;
import com.lifesimantics.hospital.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private static final String key = "HOSPITAL(#!)@*";
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean registerUser(Users.Request request) {
    	Users foundUser = userRepository.findByAccountId(request.getAccountId());
        if(foundUser==null) {        	
        	userRepository.save(Users.Request.toCreate(request));
       
        	return true;
        }else return false; 
    }

    @Override
    public boolean checkAccountId(String accountId) {
        Users checkUser = userRepository.findByAccountId(accountId);

        if (checkUser == null) return true;
        else return false;
    }

    @Override
    public Map<String, Object> loginUser(Users.Request request) {
    	Map<String, Object> map=new HashMap<String, Object>();
        Users user = userRepository.findByAccountIdAndPassword(request.getAccountId(), request.getPassword());
        if (user!=null) {
        	String token = createToken(Users.Response.toResponse(user));
        	map.put("user", Users.Response.toResponse(user));
        	map.put("token", token);
        	return map;
        }
        else return null;
    }

    @Override
    public Map<String, Object> checkLogin(String token) {
        return verifyToken(token);
    }

    private String createToken(Users.Response response) {

        Map<String, Object> headers = new HashMap<String, Object>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payloads = new HashMap<String, Object>();
        JSONObject jsonObject = new JSONObject(response);
        payloads.put("user", jsonObject.toString());

//		long expirationTime = 1000 * 60 * 60 * 24 * 1l; // 하루
		long expirationTime = 1000 * 60 * 10l;
//		long expirationTime = 1000 * 30l;

        Date expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expirationTime);

        String token = Jwts.builder().setHeader(headers)
                .setClaims(payloads)
                .setSubject("user")
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        return token;
    }
    private Map<String, Object> verifyToken(String token) {

        Map<String, Object> claimMap = new HashMap<String, Object>();

        try {

            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            claimMap = claims;
            System.out.println("claim: " + claims);
        } catch (ExpiredJwtException e) {
            claimMap.put("error", "Expired Token");
            System.out.println("Expired Token");
            System.out.println(e);
        } catch (Exception e) {
            claimMap.put("error", "No Token");
            System.out.println("No Token");
            System.out.println(e);
        }

        return claimMap;
    }
}
