import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

import {take} from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};

  constructor(private authService: AuthService, private app: AppService, private http: HttpClient) {
    http.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() {
     //return this.authService.isLoggedIn();
     
    var isLoggedInNow = false;

/*  Look into this to see if better ???????????
	this.authService.isLoggedIn.subscribe({
	 next(data) { isLoggedInNow = data; },
	 error(err) { console.error('Error: ' + err); },
	 complete() { console.log('Completed'); }
	});
*/

    // Check if the user is authenticated
    /* Ang5 working version
    this.authService.isLoggedIn.take(1).subscribe(function (data) {
        isLoggedInNow = data;
    });
    */
    this.authService.isLoggedIn.pipe(
    take(1)).subscribe(function (data) {
        isLoggedInNow = data;
    });

    if ( isLoggedInNow ) {
        return true;
    } 
    return false;
   
   }

}