import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import{User} from './user.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserService {
readonly rootUrl = 'http://localhost:49411/';

CustomerList : User[];
specifiedCustomer: Subject<Array<User>> = new BehaviorSubject<Array<User>>([])

constructor(private http : Http, private httpClient : HttpClient) { }

  //Customer registration Function
PostUser(user : User){
var body = JSON.stringify(user);
var headersOption = new Headers({'Content-Type':'application/json'});
var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
 return this.http.post(this.rootUrl + 'api/Users', body, requestOptions).map(x => x.json());
}

 //USER Login Function 
userAuthentication(UserName, Password){
  var data = "username="+UserName+"&password="+Password+"&grant_type=password";
  var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
  return this.httpClient.post(this.rootUrl+'/token',data, {headers: reqHeader});
}


//getting authenticated Customer Details  Function
  getUserClaims(){
   return this.httpClient.get(this.rootUrl+'api/GetUserClaims',{headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
  }
 
  //get user information
  getCustomer(){
    return this.http.get(this.rootUrl+'api/Users').map((data : Response)=>{
      return data.json() as User[];
    }).toPromise().then(x => {
      this.CustomerList = x;
    })
  }

  getspecifiedcustomer(){
    return this.http.get(this.rootUrl+'api/Users').map((data : Response)=>{
      return data.json()
    }).subscribe((data : any)=>{
      this.specifiedCustomer.next(data);
    })
  }
}






