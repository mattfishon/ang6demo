package com.mjb.ang6demo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class SkyUser extends org.springframework.security.core.userdetails.User {
		 
	    // Declare all custom attributes here
	    private String siteId;
	 
	    public SkyUser(String username, String password, boolean enabled, boolean accountNonExpired,
	                      boolean credentialsNonExpired, boolean accountNonLocked,
	                      Collection<GrantedAuthority> authorities, String siteId) {
	        super(username, password, enabled, accountNonExpired, credentialsNonExpired,
	                accountNonLocked, authorities);
	 
	        // Initialize all the custom attributes here like the following.
	        this.siteId = siteId;
	    }
	 
	    
	    public String getSiteId() {
	        return siteId;
	    }

	}
