package com.secuirty.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.secuirty.demo.model.City;
import com.secuirty.demo.repository.CityRepo;

@Service
public class CityService {
	
	@Autowired
	private CityRepo repo ;
	
	public City saveCity(City city) {
		repo.save(city) ;
		return city ;
	}
	
	public List<City >getCities( Integer userID) {
		
		List<City> cities = null ;
		cities = repo.findByUserID(userID) ;
		return cities ;
	}
	
	public String deleteFavCity ( int id) {
		repo.deleteById(id);
		return "deleted" ;
	}
	
	
}
