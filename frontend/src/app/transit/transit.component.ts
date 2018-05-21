import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { SecurityStats} from './securityStats';
import { CurrentTransitMetrics } from './currentTransitMetrics';
import { TransitService } from './transit.service';

//import { Subject } from 'rxjs';
//import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
//import { pipe } from 'rxjs';

//import {takeUntil} from 'rxjs/operators';
//import { interval } from 'rxjs/observable/interval';
import { interval } from 'rxjs';
import { timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { colorSets as ngxChartsColorsets } from '@swimlane/ngx-charts/release/utils/color-sets';



@Component({
  selector: 'app-transit',
  templateUrl: './transit.component.html',
  styleUrls: ['./transit.component.scss']
})
export class TransitComponent implements OnInit {

  private securityPassCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  securityPassCountDataFeed$: Observable<number>;

  private securityStatsSubject: BehaviorSubject<SecurityStats[]> = new BehaviorSubject<SecurityStats[]>([]);
  securityStatsDataFeed$: Observable<SecurityStats[]>;
  
  secStats : SecurityStats[] = [];

  private transitPassCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  transitPassCountDataFeed$: Observable<number>;

  private transitStatsSubject: BehaviorSubject<SecurityStats[]> = new BehaviorSubject<SecurityStats[]>([]);
  transitStatsDataFeed$: Observable<SecurityStats[]>;
  
  transitStats : SecurityStats[] = [];


  // Error from Rest call (not much to do with on client)  
  error: any;

  pollingData: any;     

  pieColorScheme: any;
  selectedColorScheme: string;
  view = [350, 300];  //w,d
  public visible :boolean = false;
  
  constructor(private authService: AuthService, private transitService: TransitService) {
  
 	   this.setColorScheme('cool'); 
  
/*  Test code that works to make sure object w/o async works ok  
       let stat1 = new SecurityStats('Min',45);
       this.secStats.push(stat1);
       this.visible = true;
*/
  
      this.securityStatsDataFeed$ = this.securityStatsSubject.asObservable();
      this.securityPassCountDataFeed$ = this.securityPassCountSubject.asObservable();

      this.transitStatsDataFeed$ = this.transitStatsSubject.asObservable();
      this.transitPassCountDataFeed$ = this.transitPassCountSubject.asObservable();

      this.pollingData =
         timer(0,30000).pipe(
	     flatMap( () => this.transitService.getConfig() ) )
	      .subscribe(
	        (data: CurrentTransitMetrics) => { 
	          //this.secStats = { ...data  };         // success path

			  // Security	          
	          let stat1 = new SecurityStats( 'Min', data.security5MinSeconds );
	          // Must create a new object so ngx-charts will pick it up!
	          this.secStats = [];
	          this.secStats.push(stat1);
	          this.securityStatsSubject.next( this.secStats );
	          this.securityPassCountSubject.next( data.security5MinCount );

	          // Transit
	          let statTran = new SecurityStats( 'Min', data.transit5MinSeconds );
	          // Must create a new object so ngx-charts will pick it up!
	          this.transitStats = [];
	          this.transitStats.push(statTran);
	          this.transitStatsSubject.next( this.transitStats );
	          this.transitPassCountSubject.next( data.transit5MinCount );
	          
	          
	          //console.error( 'Data is:' );
	          //console.error( data );
	          //console.error( 'Stats is:' );
	          //console.error( this.secStats  );
	          
	          
	          this.secStats.splice(1,1);
	          
	          this.visible = true;
	        },
	        error => this.error = error // error path
	       );

	       
      /*  Ang 5 work version.  
      this.pollingData =
		Observable
	    .interval(30000)
	    .startWith(0)
	    .timeInterval()
	    .flatMap( () => this.transitService.getConfig() )
	      .subscribe(..................
      */
  }

  ngOnInit() {
     /*  THIS WAS WORKING OK for testing
     this.lineData = [
		      {
		        "value": 45,
		        "name": "Minutes"
		      }
     ];
     */
  }

  ngOnDestroy() {
     this.pollingData.unsubscribe();
   }
  
  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.pieColorScheme = ngxChartsColorsets.find(s => s.name === name);
  }  
  
/*

need to research this further to see if it is needed.

	private unsubscribe: Subject = new Subject<void>();
    data: any;
    interval: any;

  constructor(private authService: AuthService, private transitService: TransitService) {}

    ngOnInit() {
      	//this.mess.security5MinMean = 45;
  		//this.mess.security5MinPeople = 5; 
    
    
        this.refreshData();
        if(this.interval){
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.refreshData();
        }, 5000);


        this.transitService.data$.takeUntil(this.unsubscribe)
            .subscribe(data => {
                this.data = data;
            });

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    refreshData(){
        this.transitService.updateData()
            .takeUntil(this.unsubscribe)
            .subscribe();
    }

    doAction(){
        this.subscription.add(
            this.transitService.doAction()
                .subscribe(result => {
                    if(result === true){
                        this.refreshData();
                    }
                })
        );
    }
*/
    
}