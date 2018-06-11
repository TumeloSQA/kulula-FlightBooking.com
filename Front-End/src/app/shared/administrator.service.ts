import { Injectable } from '@angular/core';
import {Administrator} from '../shared/administrator.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdministratorService {
  readonly rootUrl = 'http://localhost:49411/';
administrator : Administrator;
selectedAdministrator : Administrator;
adminstratorList: Administrator[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  // Post Method
  postAdministrator(administrator){
    var body = JSON.stringify(administrator);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
    return this.http.post(this.rootUrl + 'api/Administrators', body, requestOptions).map(x => x.json());
  }

  //Get Method
  GetadminstratorList(){
    this.http.get(this.rootUrl+'api/Administrators')
    .map((data : Response)=>{
      return data.json() as Administrator[];
    }).toPromise().then(x => {
      this.adminstratorList = x;
    })
  }

// put Method
Putadministrator(id,administrator){
  var body = JSON.stringify(administrator);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
  return this.http.put('http://localhost:49411/api/Administrators/'+id,body,requestOptions).map(res =>res.json());
}

//delete 
Deleteadministrator(id : number){
  return this.http.delete('http://localhost:49411/api/Administrators/'+id).map(res => res.json());
}
}
