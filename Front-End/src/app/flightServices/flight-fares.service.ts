import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {FlightFares} from '../FlightModel/flight-fares.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class FlightFaresService {
  readonly rootUrl = 'http://localhost:49411/';
flightfares :FlightFares;
selectedflightfare: FlightFares;
flightfareslist: FlightFares[];
specifiedflightfares: Subject<Array<FlightFares>> = new BehaviorSubject<Array<FlightFares>>([]);

  constructor(private http : Http, private httpClient : HttpClient) { }

//Posting information in the database function
Postflightfares(flightfares : FlightFares){
  var body = JSON.stringify(flightfares);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
  return this.http.post(this.rootUrl + 'api/api/FlightFares', body, requestOptions).map(x => x.json());
 }

 //get method function
 getflightfareslist()
 {
   return this.http.get(this.rootUrl+'api/FlightFares').map((data : Response)=>{
    return data.json() as FlightFares[];
  }).toPromise().then(x => {
    this.flightfareslist = x;
  })
 } 

 getspecifiedflightfares()
 {
   return this.http.get(this.rootUrl+'api/api/FlightFares').map((data : Response)=>{
    return data.json()
  }).subscribe((data : any)=>{
    this.specifiedflightfares.next(data);
  })
}

 //updating Method Function
 Putflightfares(id,flightfares){
  var body = JSON.stringify(flightfares);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
  return this.http.put('http://localhost:49411/api/FlightFares/'+id,body,requestOptions).map(res =>res.json());
 }

 //delete method
 Deleteflightfares(id : number)
 {
   return this.http.delete('http://localhost:49411/api/FlightFares/'+id).map((res => res.json()));
 }
}
