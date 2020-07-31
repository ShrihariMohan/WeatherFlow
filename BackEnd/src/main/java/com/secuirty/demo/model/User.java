package com.secuirty.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY) 
	private int id;
	private String username ;
	private String password ;
	private String mail;
	public int getId() {
		return id;
	}
	
	public User() {
		
	}
	public User(int id, String username, String password, String mail) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.mail = mail;
	}


	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getmail() {
		return mail;
	}
	public void setmail(String email) {
		this.mail = email;
	}
	
	
}
