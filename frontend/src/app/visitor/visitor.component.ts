import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { colorSets as ngxChartsColorsets } from '@swimlane/ngx-charts/release/utils/color-sets';
import {MatGridListModule} from '@angular/material/grid-list';

import { VisitorService } from './visitor.service';
import { AllZones } from './AllZones';
import { Zones } from './zones';
import { ChartSeries } from './chartSeries';


//import d3 from '@swimlane/ngx-charts/release/d3';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  // Error from Rest call (not much to do with on client)  
  error: any;
  
  form: FormGroup;
  private formSubmitAttempt: boolean;
  errorMsg$: Observable<boolean>;
  
  zoneGroups : Zones[] = [];
  
  selectedZone = 'All';
  /*
  zoneGroups = 
     [ { zoneName :'Zone', 
            zones : [ {name: 'All', value: ''}, {name: 'Gate area', value: ''} ] 
       },
       { zoneName :'Sensor', 
            zones  : [ {name: 'E1', value: ''}, {name: 'C1', value: ''} ] 
       }            
     ]; 
  */

  selectedTime = 'Today';
  times = [
    {name: 'Today', value: ''},
    {name: 'Yesterday', value: ''},
    {name: 'Last 7 days', value: ''},
    {name: 'Last 30 days', value: ''},
  ];

  
  pieView = [230, 210];
  visitsPieData: any;
  visitsPieColorScheme: any;

  visitorsPieData: any;
  visitorsPieColorScheme: any;

  lineData: any;
  lineColorScheme: any;
  selectedColorScheme: string;

  lineChartSeries : ChartSeries[] = [];


  barData: any;
  barColorScheme: any;

  testData: any;
  testView = [700, 600];
  
  view = [700, 210];

  public visible :boolean = false;
      
  constructor(private fb: FormBuilder, private authService: AuthService, private visitorService: VisitorService) {
  }

  ngOnInit() {
     this.form = this.fb.group({});
      
     this.populateZones();
    
     this.setColorScheme('cool');

     this.visitsPieData = [{"name": "First Time","value": 632},{"name": "Repeats","value": 1040}];
     this.visitorsPieData = [{"name": "First Time","value": 587},{"name": "Returning","value": 455}];
     
     this.barData = [
	     { "value": 10,"name": "5 min" },
	     { "value": 15,"name": "10 min" },	     
	     { "value": 20,"name": "30 min" },	     
	     { "value": 30,"name": "1 hour" },	     
	     { "value": 10,"name": "2 hour" },
	     { "value": 5,"name": "3 hour" },
	     { "value": 5,"name": "4 hour" },
	     { "value": 0,"name": "6 hour" },
	     { "value": 0,"name": "9 hour" },
	     { "value": 0,"name": "12 hour" }	     	     	     	     	     	     
     ];
     
     this.lineData = [
		  {
		    "name": "",
		    "series": [
   		      { "value": 50,"name": "9:00 AM" },
   		      { "value": 55,"name": "9:01 AM" },
   		      { "value": 40,"name": "9:02 AM" },
   		      { "value": 90,"name": "9:03 AM" },
   		      { "value": 40,"name": "9:04 AM" },
   		      { "value": 15,"name": "9:05 AM" },
   		      { "value": 40,"name": "9:06 AM" },
   		      { "value": 10,"name": "9:07 AM" },
   		      { "value": 10,"name": "9:08 AM" },
   		      { "value": 50,"name": "9:09 AM" },
  		      { "value": 60,"name": "9:10 AM" },
   		      { "value": 50,"name": "10:00 AM" },
   		      { "value": 55,"name": "10:01 AM" },
   		      { "value": 40,"name": "10:02 AM" },
   		      { "value": 90,"name": "10:03 AM" },
   		      { "value": 40,"name": "10:04 AM" },
   		      { "value": 15,"name": "10:05 AM" },
   		      { "value": 40,"name": "10:06 AM" },
   		      { "value": 10,"name": "10:07 AM" },
   		      { "value": 10,"name": "10:08 AM" },
   		      { "value": 50,"name": "10:09 AM" },
  		      { "value": 60,"name": "10:10 AM" }  		      
  		        		      
		      ]
		  }];

//     this.testData = [
        this.lineChartSeries = [
		  {
		    "name": "",
		    "series": [
   		      { "value": 0, "name": "9 AM" },
   		      { "value": 20, "name": "10 AM" },
   		      { "value": 40, "name": "11 AM" },
   		      { "value": 60, "name": "12 PM" },
   		      { "value": 80, "name": "1 PM" },
   		      { "value": 100, "name": "2 PM" },
   		      { "value": 40, "name": "3 PM" } 		      
		      ]
		  }];
     
     
     this.visible = true;
  }

  ngOnDestroy() {
     //this.pollingData.unsubscribe();
  }
  
  populateZones() {
  
	  this.visitorService.getZones()
	      .subscribe(
	         (data: Zones[] ) => {
	          this.zoneGroups = data;
	          
	          //console.log( 'Data is: ' );
	          //console.log( data );
	          	          
	          //this.securityStatsSubject.next( this.secStats );
	          //this.securityPassCountSubject.next( data.security5MinCount );
	          
	          //Remove array item
	          //this.secStats.splice(1,1);
	          
	          this.visible = true;
	        },
	        error => this.error = error // error path
	       );  
  }

  populateLineChart() {
  
	  this.visitorService.getLineChart()
	      .subscribe(
	         (data: ChartSeries[] ) => {
	          this.lineChartSeries = data;
	          
	          //console.log( 'Data is: ' );
	          //console.log( data );
	          	          
	          //this.securityStatsSubject.next( this.secStats );
	          //this.securityPassCountSubject.next( data.security5MinCount );
	          
	          //Remove array item
	          //this.secStats.splice(1,1);
	          
	        },
	        error => this.error = error // error path
	       );  
  }
  
  onSubmit() {
    console.error('Sel: ');
    console.error(this.selectedZone);
    console.error('Sel: ');
    console.error(this.selectedTime);
      
    //Need to change array to Observable and async in html  
    //this.populateLineChart();
        
    if (this.form.valid) {
      //this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  
  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.visitsPieColorScheme = ngxChartsColorsets.find(s => s.name === name);
    this.visitorsPieColorScheme = ngxChartsColorsets.find(s => s.name === name);
    this.barColorScheme = ngxChartsColorsets.find(s => s.name === name);        
    this.lineColorScheme = ngxChartsColorsets.find(s => s.name === name);        
  }
}