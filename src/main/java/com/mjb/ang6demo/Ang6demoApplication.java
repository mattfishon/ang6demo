package com.mjb.ang6demo;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Ang6demoApplication {

	  @RequestMapping("/resource")
	  public Map<String,Object> home() {
	    Map<String,Object> model = new HashMap<String,Object>();
	    model.put("id", UUID.randomUUID().toString());
	    model.put("content", "Hello World");
	    return model;
	  }
	  
	  @RequestMapping("/user")
	  public Principal user(Principal user) {
	    return user;
	  }

	  @RequestMapping("/transitMetrics")
	  public CurrentTransitMetrics transit() {
		CurrentTransitMetrics msg = new CurrentTransitMetrics();

		Random r = new Random();
		int me =  r.nextInt((100 - 1) + 1) + 1;
		int me1 =  r.nextInt((100 - 1) + 1) + 1;
		int me2 =  r.nextInt((100 - 1) + 1) + 1;		
		int me3 =  r.nextInt((100 - 1) + 1) + 1;		

		msg.setSecurity5MinCount( me );
		msg.setSecurity5MinSeconds( me1 );
		msg.setTransit5MinCount( me2 );
		msg.setTransit5MinSeconds( me3 );
		
	    return msg;
	  }

	  @Configuration
	  @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	  protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		  
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	      http
	        .httpBasic()
	      .and()
	        .authorizeRequests()
	          .antMatchers("/index.html", "/", "/home", "/login").permitAll()
	          .anyRequest().authenticated()
	      .and().csrf()
	          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	    }
	  
	  
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.inMemoryAuthentication()
	                .withUser("jfk1")
	                    .password("wifi2016")
	                    .roles("USER")
	            .and()
	                .withUser("manager")
	                    .password("password")
	                    .credentialsExpired(true)
	                    .accountExpired(true)
	                    .accountLocked(true)
	                    .authorities("WRITE_PRIVILEGES", "READ_PRIVILEGES")
	                    .roles("MANAGER");
	    }
	  
	}

	public static void main(String[] args) {
		SpringApplication.run(Ang6demoApplication.class, args);
	}
}
