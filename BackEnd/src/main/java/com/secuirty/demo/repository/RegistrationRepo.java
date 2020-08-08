package com.secuirty.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secuirty.demo.model.User;

public interface RegistrationRepo extends JpaRepository<User , Integer>{

	User findByMail(String mail) ;
	User findByMailAndPassword(String mail, String password) ;

		
	
	
}
