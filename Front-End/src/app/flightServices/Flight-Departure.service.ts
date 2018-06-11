import { Injectable } from '@angular/core';
import {Airport} from '../FlightModel/Flight-Departure.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class AirportService {
  readonly rootUrl = 'http://localhost:49411/';
  airport : Airport;
  sectedAirport : Airport;
  airportlist : Airport[];
  specifiedAirport:Subject<Array<Airport>> = new BehaviorSubject<Array<Airport>>([]);
  constructor(private http : Http, private httpClient : HttpClient) { }
  
//Posting information in the database function
  PostAirport(airport : Airport){
    var body = JSON.stringify(airport);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
    return this.http.post(this.rootUrl + 'api/Flight_Departure', body, requestOptions).map(x => x.json());
   }

   //get method function
   getAirpot()
   {
     return this.http.get(this.rootUrl+'api/Flight_Departure').map((data : Response)=>{
      return data.json() as Airport[];
    }).toPromise().then(x => {
      this.airportlist = x;
    })
   } 

   getspecifiedAirport()
   {
     return this.http.get(this.rootUrl+'api/Flight_Departure').map((data : Response)=>{
      return data.json()
    }).subscribe((data : any)=>{
      this.specifiedAirport.next(data);
    })
  }

   //updating Method Function
   Putairport(id,airport){
    var body = JSON.stringify(airport);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
    return this.http.put('http://localhost:49411/api/Flight_Departure/'+id,body,requestOptions).map(res =>res.json());
   }

   //delete method
   DeleteAirport(id : number)
   {
     return this.http.delete('http://localhost:49411/api/Flight_Departure/'+id).map((res => res.json()));
   }
}
