import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {FlightBooking} from '../flightmodel/flight-booking.model';

@Injectable()
export class FlightBookingService {
  readonly rootUrl = 'http://localhost:49411/';
  flightbooking : FlightBooking;
  selectedflightbooking: FlightBooking;
  flightbookinglist: FlightBooking[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  //Post Method
  PostFlightBooking(flightbooking : FlightBooking){
    var body = JSON.stringify(flightbooking);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
    return this.http.post(this.rootUrl + 'api/FlightBookings', body, requestOptions).map(x => x.json());
  }


//Get Method
getFlightBooking()
 {
   return this.http.get(this.rootUrl+'api/FlightBookings').map((data:Response)=>{   
     return data.json() as FlightBooking[];
  }).toPromise().then(x => {
    this.flightbookinglist = x;
  })
 }

 //Put Method

 PutFlightBooking(id,flightbooking)
 {
   var body = JSON.stringify(flightbooking);
   var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
   return this.http.put('http://localhost:49411/api/FlightBookings/'+id,body,requestOptions).map(res =>res.json());
 }

 //delete Method

 DeleteFlight(id : number)
 {
 return this.http.delete('http://localhost:49411/api/FlightBookings/'+id).map((res => res.json()));
 }
}
