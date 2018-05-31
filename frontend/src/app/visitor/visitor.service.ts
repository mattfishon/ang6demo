import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Zones } from './zones';
import { ChartSeries } from './chartSeries';

//import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class VisitorService {

  constructor(private http: HttpClient) {}

  getZones() : Observable<Zones[]>  {
    return this.http.get<Zones[]>('/zones')
      .pipe(
        retry(3) // retry a failed request up to 3 times
      );
      
     // Was not compling .... fix this
     // .catchError(this.handleError) // then handle the error      
  }

  getLineChart() : Observable<ChartSeries[]>  {
    return this.http.get<ChartSeries[]>('/visitorLineOfDaily')
      .pipe(
        retry(3) // retry a failed request up to 3 times
      );
      
     // Was not compling .... fix this
     // .catchError(this.handleError) // then handle the error      
  }
  
  /*
    private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    //return throwError(
    //  'Something bad happened; please try again later.');
  };
  */



/*
research below to see if needed.

    private dataSubject: BehaviorSubject<Message> = new BehaviorSubject([]);

    data$: Observable<Message> = this.dataSubject.asObservable();
*/
    //updateData(): Observable<any>  {
/*    
    updateData(): Observable<Message>  {    
        return this.getData().do((data) => {
            this.dataSubject.next(data);
        });
    }
*/    
    // My data is an array of model objects
/*    
    getData(): Observable<Message>{
        return this.http.get('/transit')
            .map((response: Response) => {
                let data = response.json();
                //let data = response.json() && response.json().your_data_objects;
                if(data){
                    return data;
                }
            })
    }
*/    

}