import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {CreditCard} from '../flightmodel/credit-card.model';



@Injectable()
export class CreditCardService {
  readonly rootUrl = 'http://localhost:49411/';

  credit : CreditCard;
  constructor(private http : Http, private httpClient : HttpClient) { }

  //Post method Function
  PostCrediCard(credit : CreditCard)
{
  var body = JSON.stringify(credit);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
  return this.http.post(this.rootUrl + 'api/CreditCards', body, requestOptions).map(x => x.json());
}

//Get  Function
getCreditCard()
{
  return this.http.get(this.rootUrl+'api/CreditCards').map((data:Response)=> data.json());
}



//Put  Function
PutCreditcard(id,credit)
 {
   var body =JSON.stringify(credit);
   var headersOption = new Headers({'Content-Type':'application/json'});
   var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
   return this.http.put('http://localhost:49411/api/CreditCards/'+id,body,requestOptions).map(res =>res.json());
 }


//Delete Funtion
DeleteCreditCard(id : number){

return this.http.delete('http://localhost:49411/api/CreditCards/'+id).map((res => res.json()));
}

}
