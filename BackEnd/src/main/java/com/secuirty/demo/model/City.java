package com.secuirty.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class City {
	
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY) 
	
	private int id ;
	private int userID ;
	
	private String city ;
	
	
	
	
	public City(int id , int userID,  String city) {
		super();
		this.id = id;
		this.userID = userID ;
		this.city = city;
	}
	
	public City() {
		
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}
	
		

}