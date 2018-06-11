import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Cart} from '../FlightModel/cart.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class CartService {
  readonly rootUrl = 'http://localhost:49411/';
  cart : Cart;
 cartlists : Cart[];
 cartList: Subject<Array<Cart>> = new BehaviorSubject<Array<Cart>>([])
  constructor(private http : Http, private httpClient : HttpClient) { }

 //Post Method
 PostCart(cart : Cart) {
  var body = JSON.stringify(cart);
  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
  return this.http.post(this.rootUrl + 'api/Carts', body, requestOptions).map(responseObservable => responseObservable.json());
}
 

//Get Method
Getcartlist()
{
  return this.http.get(this.rootUrl+'api/Carts').map((data:Response)=>{
  return data.json() as Cart[];
}).toPromise().then(x => {
  this.cartlists = x;
})
}

getspecifiedCart(){
   return this.http.get(this.rootUrl+'api/Carts').map((data:Response)=>{
   return data.json() 
    }).subscribe((data : any)=>{
      this.cartList.next(data);
    })
  }
//Put Method
PutCart(id,cart)
{
  var body = JSON.stringify(cart);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
  return this.http.put('http://localhost:49411/api/Carts/'+id,body,requestOptions).map(res =>res.json());
}

//Delete Method
DeleteCart(id : number){
 return this.http.delete('http://localhost:49411/api/Carts/'+id).map((res => res.json()));
}
}
