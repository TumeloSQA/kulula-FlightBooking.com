import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Payment} from '../flightmodel/payment';


@Injectable()
export class PaymentService {
  readonly rootUrl = 'http://localhost:49411/';

  payment: Payment;
  constructor(private http : Http, private httpClient : HttpClient) { }

  // Post Method
  PostPayment(payment: Payment){
    var body = JSON.stringify(payment);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
    return this.http.post(this.rootUrl + 'api/Payments', body, requestOptions).map(x => x.json()); 
  }

  //Get Method
  GetPayment()
  {
    return this.http.get(this.rootUrl+'api/Payments').map((data:Response)=> data.json());
  }

  //Put Method
  PutPayment(id,payment)
{
 var body = JSON.stringify(payment);
 var headersOption = new Headers({'Content-Type':'application/json'});
 var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
 return this.http.put('http://localhost:49411/api/Payments/'+id,body,requestOptions).map(res =>res.json());
}

//Delete Method
DeletePayment(id : number)
{
  return this.http.delete('http://localhost:49411/api/Payments/'+id).map((res => res.json()));
}
}
