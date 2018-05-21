import './rxjs-operators';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';

import { HeaderComponent } from './header/header.component';
import { AppService } from './app.service';
import { HomeComponent } from './home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TransitComponent } from './transit/transit.component';
import { TransitService } from './transit/transit.service';
import { VisitorService } from './visitor/visitor.service';
import { VisitorComponent } from './visitor/visitor.component';


import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import {NgxChartsModule} from "@swimlane/ngx-charts";

/***
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'transit', component: TransitComponent}
];
*/

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'transit', component: TransitComponent, canActivate: [AuthGuard]},
  { path: 'visitor', component: VisitorComponent, canActivate: [AuthGuard]},  
  { path: '**', redirectTo: ''},

];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

// Note I replaced BrowserModule with BrowserAnimationsModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    TransitComponent,
    VisitorComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatDividerModule,
	MatGridListModule,    
    NgxChartsModule
  ],
  providers: [AuthGuard, AuthService, TransitService, VisitorService, AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }