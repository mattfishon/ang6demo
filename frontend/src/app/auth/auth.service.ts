import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private errorMsg: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isErrorMsg() {
    return this.errorMsg.asObservable();
  }
  
  constructor(
    private router: Router, private http: HttpClient
  ) {
          if (localStorage.getItem('currentUser')) {
			this.loggedIn.next(true);
          }
  }

  login(user: User){
    if (user.userName !== '' && user.password != '' ){
    
        const headers = new HttpHeaders(user ? {
            authorization : 'Basic ' + btoa(user.userName + ':' + user.password)
        } : {});

        this.http.get('user', {headers: headers}).subscribe(response => {
            if (response['name']) {
                //this.authenticated = true;
                
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } 
                this.errorMsg.next(false);                
                this.loggedIn.next(true);
      			this.router.navigate(['/']);
            } else {
                //this.authenticated = false;
            }
            
        },
        error => { this.errorMsg.next(true);}
        );
    
    }
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
        
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    //this.router.navigate(['/login']);

  }
}