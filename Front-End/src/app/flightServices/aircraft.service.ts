import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AirCraft} from '../FlightModel/air-craft.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class AircraftService {
  readonly rootUrl = 'http://localhost:49411/'; 
aircraft: AirCraft;
selectedaircraft: AirCraft;
aircraftlist: AirCraft[];
specifiedAirCraft: Subject<Array<AirCraft>> = new BehaviorSubject<Array<AirCraft>>([])

  constructor(private http : Http, private httpClient : HttpClient) { }


    // Post Method
    PostAircraft(aircraft: AirCraft)
    {
      var body = JSON.stringify(aircraft);
      var headersOption = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
      return this.http.post(this.rootUrl + 'api/Aircraft', body, requestOptions).map(x => x.json());
    }
    
    //Get Method
    Getaircraftlist()
    {
     return this.http.get(this.rootUrl+'api/Aircraft').map((data:Response)=> {
      return data.json() as AirCraft[];
    }).toPromise().then(x => {
      this.aircraftlist = x;
    })
    
    }
    getspecifiedAirCraft(){
      return this.http.get(this.rootUrl+'api/Aircraft').map((data:Response)=> {
      return data.json()
    }).subscribe((data : any)=>{
      this.specifiedAirCraft.next(data);
    })
    }
    
    // Put Method
    PutAircraft(id,aircraft)
    {
      var body = JSON.stringify(aircraft);
      var headersOption = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
      return this.http.put('http://localhost:49411/api/Aircraft/'+id,body,requestOptions).map(res =>res.json());
    }
    
    // Delete Method
    DeleteAircrafts(id : number)
    {
      return this.http.delete('http://localhost:49411/api/Aircraft/'+id).map((res => res.json()));
    } 
}
