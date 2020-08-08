package com.secuirty.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.secuirty.demo.model.City;

public interface CityRepo extends JpaRepository<City , Integer> {
	
	public List<City> findByUserID(Integer userId) ;
}
