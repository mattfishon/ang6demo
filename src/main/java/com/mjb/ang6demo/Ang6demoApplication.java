package com.mjb.ang6demo;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
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

	  @RequestMapping("/zones")
	  public ZoneGroups[] getZones() {
		List<ZoneGroups> msg = new ArrayList<>();
		
		ZoneGroups grp = new ZoneGroups();
		grp.setZoneName( "Zones" );
		Zone z1 = new Zone();
		z1.setName( "All" );
		Zone z2 = new Zone();
		z2.setName( "Gates" );
		grp.addZone(z1);
		grp.addZone(z2);
		msg.add( grp );
		
		ZoneGroups grp2 = new ZoneGroups();
		grp2.setZoneName( "Sensors" );
		Zone s1 = new Zone();
		s1.setName( "A1" );
		Zone s2 = new Zone();
		s2.setName( "D1" );
		grp2.addZone(s1);
		grp2.addZone(s2);
		msg.add( grp2 );
		

		User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if ( user instanceof SkyUser ) {
		   //System.out.println("site Id: " + ((SkyUser)user).getSiteId() );
	    }
		
	    return msg.toArray(new ZoneGroups[msg.size()]);
	  }

	  @RequestMapping("/transitMetrics")
	  public CurrentTransitMetrics transit() {
		CurrentTransitMetrics msg = new CurrentTransitMetrics();

	      User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	      if ( user instanceof SkyUser ) {
		      System.out.println("site Id: " + ((SkyUser)user).getSiteId() );
	      }
	      String name = user.getUsername();
	      System.out.println("user: " + name );
		
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
	    	auth.userDetailsService(new SkyUserDetailsService());
	        
//	        auth.inMemoryAuthentication()
//	                .withUser("jfk1")
//	                    .password("jfk1")
//	                    .roles("USER")
//	            .and()
//	                .withUser("manager")
//	                    .password("password")
//	                    .credentialsExpired(true)
//	                    .accountExpired(true)
//	                    .accountLocked(true)
//	                    .authorities("WRITE_PRIVILEGES", "READ_PRIVILEGES")
//	                    .roles("MANAGER");
	    }
	  
	}
	  
	public static void main(String[] args) {
		SpringApplication.run(Ang6demoApplication.class, args);
	}
}
