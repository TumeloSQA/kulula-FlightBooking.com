import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Route} from '../FlightModel/Flight-Arrival.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RouteService {
  readonly rootUrl = 'http://localhost:49411/';
  route : Route;
  routelist : Route[];
  selectedroute : Route;
  specifiedroute:Subject<Array<Route>> = new BehaviorSubject<Array<Route>>([]);
  constructor(private http : Http, private httpClient : HttpClient) { }

  //Post Method
  PostRoute(selectedroute : Route){
    var body = JSON.stringify(selectedroute);
    var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
   return this.http.post(this.rootUrl + 'api/FlightArrivals', body, requestOptions).map(x => x.json());
  }

  //Get Method
  GetRouteList()
  {
    return this.http.get(this.rootUrl+'api/FlightArrivals').map((data:Response)=>{
    return data.json() as Route[];
  }).toPromise().then(x => {
    this.routelist = x;
  })
  }

 getspecifiedroute(){
    return this.http.get(this.rootUrl+'api/FlightArrivals').map((data : Response)=>{
      return data.json()
    }).subscribe((data : any)=>{
      this.specifiedroute.next(data);
    })
  }
  //Put Method
  PutRoute(id,selectedroute)
  {
    var body = JSON.stringify(selectedroute);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
    return this.http.put('http://localhost:49411/api/FlightArrivals/'+id,body,requestOptions).map(res =>res.json());
  }

  //Delete Method
  DeleteRoute(id : number){
   return this.http.delete('http://localhost:49411/api/FlightArrivals/'+id).map((res => res.json()));
  }

}
