package com.secuirty.demo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


import com.secuirty.demo.model.City;
import com.secuirty.demo.service.CityService;

@RestController
public class CityController {
	@Autowired
	private CityService service ;
	
	@PostMapping("/data")
	@CrossOrigin ( origins ="http://localhost:4200")
	public City setCities(@RequestBody City city, HttpServletRequest req){
		city.setUserID((Integer)req.getAttribute("userId"));
		City cityObj;
		cityObj = service.saveCity(city) ; 
		System.out.println("save fave city");
		return cityObj ;
	}
	
	@GetMapping("/fav")
	@CrossOrigin ( origins ="http://localhost:4200")
	public List<City> getCities (HttpServletRequest req) {
		System.out.println(req.getAttribute("userId"));
		List<City> cities = null ;
		cities = service.getCities((Integer)req.getAttribute("userId")) ;
		return cities ;
	}
	
	@DeleteMapping("/del/{id}")
	@CrossOrigin ( origins = "http://localhost:4200")
	public String deleteFavCity (@PathVariable Integer id) {
		service.deleteFavCity(id ) ;
		return "deleted" ;
		
		
}
}
