package com.secuirty.demo.service;

import java.io.Serializable;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTService implements Serializable {

	@Value("${jwt.secret}")
	private String secret;
	
	public String generateToken(int userId) {
		return Jwts.builder()
				.setSubject(String.valueOf(userId))
				.signWith(SignatureAlgorithm.HS512, "secret_key")
				.compact();		
	}
	
	public Integer validateToken(String token) {
		Claims jws;

		try {
			
			System.out.println(Jwts.parser().isSigned(token));
			jws = Jwts.parser().setSigningKey("secret_key").parseClaimsJws(token).getBody();
			System.out.println("Here");
			System.out.println(jws.getSubject());
			return Integer.valueOf(jws.getSubject());
		} catch (JwtException e) {
			e.printStackTrace();
		    return null;
		}

	}
}