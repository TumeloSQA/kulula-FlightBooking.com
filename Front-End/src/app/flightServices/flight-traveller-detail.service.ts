import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {FlightTravellerDetail} from '../flightmodel/flight-traveller-detail.model';

@Injectable()
export class FlightTravellerDetailService {
  readonly rootUrl = 'http://localhost:49411/';
  flighttravellerdetail : FlightTravellerDetail;
  selectedFlightTravellers : FlightTravellerDetail;
  flightTravellersList : FlightTravellerDetail[];
  specifiedflightTraveller :Subject<Array<FlightTravellerDetail>> = new BehaviorSubject<Array<FlightTravellerDetail>>([])
  constructor(private http : Http, private httpClient : HttpClient) { }

  //Post Method
  PostFlightTravellerDetail(flighttravellerdetail : FlightTravellerDetail)
{
  var body = JSON.stringify(flighttravellerdetail);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
  return this.http.post(this.rootUrl + 'api/FlightTravellerDetails', body, requestOptions).map(x => x.json());
}
//Get Method
GetFlightTravellerDetail()
{
  return this.http.get(this.rootUrl+'api/FlightTravellerDetails').map((data:Response)=> data.json());
}

getFlightTravellersDetailsList(){
return this.http.get(this.rootUrl+'api/FlightTravellerDetails').map((data:Response)=>{
return data.json() as FlightTravellerDetail[];
}).toPromise().then(x => {
  this.flightTravellersList = x;
})
}

GetspecifiedFlightTravellerDetail(){
  return this.http.get(this.rootUrl+'api/FlightTravellerDetails').map((data:Response)=>{
  return data.json() 
}).subscribe((data : any)=>{
  this.specifiedflightTraveller.next(data);
})
}


//Put Method
PutFlightTravellerDetails(id,flighttravellerdetail)
 {
   var body = JSON.stringify(flighttravellerdetail);
   var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
   return this.http.put('http://localhost:49411/api/FlightTravellerDetails/'+id,body,requestOptions).map(res =>res.json());
 }

 //Delete Method
 DeleteFlightTravellerDetails(id : number)
 {
   return this.http.delete('http://localhost:49411/api/FlightTravellerDetails/'+id).map((res => res.json()));
 }
}
