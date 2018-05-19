package com.mjb.ang6demo;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class SkyUserDetailsService implements UserDetailsService {
    private static List<UserObject> users = new ArrayList();

    public SkyUserDetailsService() {
        //in a real application, instead of using local data,
        // we will find user details by some other means e.g. from an external system
        users.add(new UserObject("jfk1", "jfk1", "USER"));
        users.add(new UserObject("mike", "234", "ADMIN"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserObject> user = users.stream()
                                         .filter(u -> u.name.equals(username))
                                         .findAny();
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found by name: " + username);
        }
        //return toUserDetails(user.get());
        
        
//        User user = User.findByUsername(username)
//        if(!user)
//            throw new NoStackUsernameNotFoundException();
         
        Collection<GrantedAuthority> authorities = new ArrayList<>();
         
//        user.authorities.each {authority->
//            authorities.collect(new SimpleGrantedAuthority(authority))
//        }
         
        //authorities = authorities ?: [NO_ROLE]
 
         authorities.add(new SimpleGrantedAuthority(getRole(user.get())));
        		
        // Return the Custom User object 
        //return new SkyUser(username, user.password, user.enabled, !user.accountExpired, !user.passwordExpired,!user.accountLocked, authorities, "1234");
        return new SkyUser(username, user.get().password, true, true, true, true, authorities, "1234");
    
    }

    private UserDetails toUserDetails(UserObject userObject) {
        return User.withUsername(userObject.name)
                   .password(userObject.password)
                   .roles(userObject.role).build();
    }

    private String getRole(UserObject userObject) {
        return userObject.role;
    }
    
    private static class UserObject {
        private String name;
        private String password;
        private String role;

        public UserObject(String name, String password, String role) {
            this.name = name;
            this.password = password;
            this.role = role;
        }

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}
        
        
    }
}
