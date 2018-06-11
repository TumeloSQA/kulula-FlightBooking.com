import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {PreferredClass} from '../FlightModel/preferred-class.model';

@Injectable()
export class PreferredClassService {
  readonly rootUrl = 'http://localhost:49411/';
 selectedClass : PreferredClass;
 preferredclasslist : PreferredClass[];
 preferredclassl : Subject<Array<PreferredClass>> = new BehaviorSubject<Array<PreferredClass>>([])

 
  constructor(private http : Http, private httpClient : HttpClient) { }

    //Post Method
    Postpreferredclass(preferredclass: PreferredClass){
      var body = JSON.stringify(preferredclass);
      var headersOption = new Headers({'Content-Type':'application/json'});
     var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/PreferredClasses', body, requestOptions).map(x => x.json());
    }
  
    //Get Method
    Getpreferredclasslist()
    {
      return this.http.get(this.rootUrl+'api/PreferredClasses').map((data:Response)=>{
      return data.json() as PreferredClass[];
    }).toPromise().then(x => {
      this.preferredclasslist = x;
    })
    }
    Getpreferredclass()
    {
      return this.http.get(this.rootUrl+'api/PreferredClasses').map((data:Response)=>{
      return data.json() 
    }).subscribe((data : any)=>{
      this.preferredclassl.next(data);
    })
    
  }
    //Put Method
    Putpreferredclass(id,preferredclass)
    {
      var body = JSON.stringify(preferredclass);
      var headersOption = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
      return this.http.put('http://localhost:49411/api/PreferredClasses/'+id,body,requestOptions).map(res =>res.json());
    }
  
    //Delete Method
    Deletepreferredclass(id : number){
     return this.http.delete('http://localhost:49411/api/PreferredClasses/'+id).map((res => res.json()));
    }
}
