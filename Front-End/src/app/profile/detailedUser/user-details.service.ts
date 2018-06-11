import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Customer} from './customer';
@Injectable()
export class UserDetailsService {
  readonly rootUrl = 'http://localhost:49411/';
  customer : Customer;
  
  constructor(private httpClient : HttpClient, private http : Http ) { }
 //get  user details 
  getUserClaims(){
    return this.httpClient.get(this.rootUrl+'api/GetUserClaims',{headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
   }
  //update user
   putUser(id,customer){
     var body = JSON.stringify(customer);
     var headerOptions = new Headers({'Content-Type': 'application/json'});
     var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
     return this.http.put('http://localhost:49411/api/Users/'+id,body,requestOptions).map(res =>res.json());
   }

}
