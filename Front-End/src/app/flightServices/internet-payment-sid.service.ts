import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {InternetPaymentSID} from '../flightmodel/internet-payment-sid.model';
@Injectable()
export class InternetPaymentSIDService {
 readonly rootUrl = 'http://localhost:49411/';

 internet : InternetPaymentSID;
 constructor(private http : Http, private httpClient : HttpClient) { }

 //Post Method
 PostInternetPaymentSID(internet : InternetPaymentSID)
 {
   var body = JSON.stringify(internet);
   var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
   return this.http.post(this.rootUrl + 'api/InternetPaymentSIDs', body, requestOptions).map(x => x.json());
 }

 //Get Method
 GetInternetPaymentSID()
 {
   return this.http.get(this.rootUrl+'api/InternetPaymentSIDs').map((data:Response)=> data.json());
 }

 //Put Method
 PutInternetPaymentSID(id,internet)
 {
   var body = JSON.stringify(internet);
   var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
   return this.http.put('http://localhost:49411/api/InternetPaymentSIDs/'+id,body,requestOptions).map(res =>res.json());
 }

 //Delete Method
 DeleteInternetPaymentSID(id : number)
 {
   return this.http.delete('http://localhost:49411/api/InternetPaymentSIDs/'+id).map((res => res.json()));
 }
 
}
