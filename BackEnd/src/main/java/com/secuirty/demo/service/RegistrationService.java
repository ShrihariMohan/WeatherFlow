package com.secuirty.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.secuirty.demo.model.User;
import com.secuirty.demo.repository.RegistrationRepo;

import java.util.Optional;

@Service
public class RegistrationService {
	
	@Autowired
	private RegistrationRepo repo ;
	
	public User saveUser ( User user) {
		repo.save(user) ;
		return user ;
	}
	
	public User FetchUserByEmailId( String mail) {
		return repo.findByMail(mail) ;
	}
	
	public User FetchUserByEmailIdAndPass( String mail , String password) {
		User x =  repo.findByMailAndPassword(mail,password) ;
		return x ;
	}

	public Optional<User> FetchUserName(Integer Id ) {
		return repo.findById(Id) ;
	}
	
	
	
}
