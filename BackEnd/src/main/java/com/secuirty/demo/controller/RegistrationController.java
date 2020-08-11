package com.secuirty.demo.controller;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;


import com.secuirty.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.secuirty.demo.model.User;
import com.secuirty.demo.service.JWTService;
import com.secuirty.demo.service.RegistrationService;
import com.secuirty.demo.filters.AuthFilter ;

import java.util.Optional;

@RestController
public class RegistrationController {
	@Autowired
	private EmailService emailService;


	@Autowired
    private AuthFilter filter ;
	@Autowired
	private RegistrationService service ;


	@RequestMapping("/")
    public String home(){
        return "Hello World!";
    }
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
	Integer userID ;
	String userName = "";


	@PostMapping("/new")
	@CrossOrigin  ( origins ="http://localhost:4200")
	public String register(@RequestBody User user) throws Exception {
		String tempEmail = user.getmail();
		if ( tempEmail != null && !tempEmail.equals("")) {
			User userObj = service.FetchUserByEmailId(tempEmail) ;

			if ( userObj != null) {
				throw new Exception("User With "+ tempEmail+ " is already Registered") ;
			}
		}
		String encodedPWD =  encoder.encode(user.getPassword()) ;
		user.setPassword(encodedPWD);
		User userObj = null ;
		emailService.sendMail(user.getmail(), "Welcome to WeatherFlow ", "" +
				"We’re glad you could join us. Have the Weather Flowing with you , Cheers.");

		userObj = service.saveUser(user) ;
		return "OK" ;
	}
	
	@PostMapping("/login")
	@CrossOrigin ( origins ="http://localhost:4200")
	public String  loginUser(@RequestBody User user,  HttpServletResponse response) throws Exception {
		String tempMail = user.getmail() ;
		String tempPass = user.getPassword() ;
		//String tempPass = user.getPassword() ;
		User test = service.FetchUserByEmailId(tempMail) ;
		if ( encoder.matches(tempPass, test.getPassword())) {
			this.setCookie(response, test.getId());
			this.userID = test.getId() ;
			this.userName = test.getUsername() ;
			return test.getUsername() ;
		}
		else throw new Exception("Credentials invalid") ;
		}

		@PostMapping("/logout")
		@CrossOrigin( origins = "http://localhost:4200")
		public String logoutUser( HttpServletResponse response) {
	        this.userID = filter.getUserID();
            System.out.println("Logout "+this.userID );
			this.deleteCookie(response , this.userID);
            System.out.println("delete " + this.userName);
			return "\"OK\"" ;
		}

		@GetMapping("/name")
		@CrossOrigin( origins = "http://localhost:4200")
		public String getUserName() {
		this.userName = filter.getUserName();
		return this.userName ;
		}


		public Boolean setCookie(HttpServletResponse response, Integer userId) {
	    // create a cookie
	    Cookie cookie = new Cookie("token", new JWTService().generateToken(userId));
	    cookie.setPath("/");
	    cookie.setHttpOnly(true) ;
		cookie.setMaxAge(100 * 60 * 60);
	    //cookie.s ;
	    //add cookie to response
	    response.addCookie(cookie);

	    return true;
	}

	public Boolean deleteCookie(HttpServletResponse response, Integer userId) {
		// create a cookie
		Cookie cookie = new Cookie("token", new JWTService().generateToken(userId));
		cookie.setPath("/");
		cookie.setHttpOnly(true) ;
		cookie.setMaxAge(0) ;
		//cookie.s ;
		//add cookie to response
		response.addCookie(cookie);

		return true;
	}
	}



