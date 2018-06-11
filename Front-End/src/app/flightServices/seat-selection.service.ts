import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {SeatSelection} from '../FlightModel/seat-selection.model';

@Injectable()
export class SeatSelectionService {
  readonly rootUrl = 'http://localhost:49411/';
// seatselection : SeatSelection;
 selectedseat: SeatSelection;
 seatselectionlist : SeatSelection[];
SeatSelectionArray :  Subject<Array<SeatSelection>> = new BehaviorSubject<Array<SeatSelection>>([])
  constructor(private http : Http, private httpClient : HttpClient) { }

    //Post Method
    Postseatselection(seatselection: SeatSelection){
      var body = JSON.stringify(seatselection);
      var headersOption = new Headers({'Content-Type':'application/json'});
     var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/SeatSelections', body, requestOptions).map(x => x.json());
    }

        //Get Method
        GetseatselectionList()
        {
          return this.http.get(this.rootUrl+'api/SeatSelections').map((data:Response)=>{
          return data.json() as SeatSelection[];
        }).toPromise().then(x => {
          this.seatselectionlist = x;
        })
        }

        GetSpecifiedseatselections()
        {
          return this.http.get(this.rootUrl+'api/SeatSelections').map((data:Response)=>{
          return data.json() 
        }).subscribe((data : any)=>{
          this.SeatSelectionArray.next(data);
        })
        
      }

    //Put Method
      Putseatselections(id,seatselection)
      {
        var body = JSON.stringify(seatselection);
        var headersOption = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headersOption});
        return this.http.put('http://localhost:49411/api/SeatSelections/'+id,body,requestOptions).map(res =>res.json());
      }

         //Delete Method
     Deleteseatselection(id : number){
      return this.http.delete('http://localhost:49411/api/SeatSelections/'+id).map((res => res.json()));
     }
}
