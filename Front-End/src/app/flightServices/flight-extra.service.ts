import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {FlightExtra} from '../flightmodel/flight-extra.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class FlightExtraService {
  readonly rootUrl = 'http://localhost:49411/'; 
  fightExtraList : FlightExtra[];
  selectedflightextra :FlightExtra
  flightextra : FlightExtra;
 flightExtrelist2: Subject<Array<FlightExtra>> = new BehaviorSubject<Array<FlightExtra>>([])
  constructor(private http : Http, private httpClient : HttpClient) { }

  // Post Method
  PostFlightExtra(flightextra : FlightExtra)
{
  var body = JSON.stringify(flightextra);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
  return this.http.post(this.rootUrl + 'api/FlightExtras', body, requestOptions).map(x => x.json());
}

//Get Method
GetFlightExtra()
{
 return this.http.get(this.rootUrl+'api/FlightExtras').map((data:Response)=> {
  return data.json() as FlightExtra[];
}).toPromise().then(x => {
  this.fightExtraList = x;
})

}
getFlightExtraList(){
  return this.http.get(this.rootUrl+'api/FlightExtras').map((data:Response)=> {
  return data.json()
}).subscribe((data : any)=>{
  this.flightExtrelist2.next(data);
})
}

// Put Method
PutFlightEtras(id,flightextra)
{
  var body = JSON.stringify(flightextra);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
  return this.http.put('http://localhost:49411/api/FlightExtras/'+id,body,requestOptions).map(res =>res.json());
}

// Delete Method
DeleteFlightExtras(id : number)
{
  return this.http.delete('http://localhost:49411/api/FlightExtras/'+id).map((res => res.json()));
} 
}
