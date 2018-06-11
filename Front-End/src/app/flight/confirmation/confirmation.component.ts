import { Component, OnInit} from '@angular/core';
import{User} from'../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FlightBooking} from '../../FlightModel/flight-booking.model';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import {Route} from '../../FlightModel/Flight-Arrival.model';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
import {PreferredClass} from '../../FlightModel/preferred-class.model';
import {PreferredClassService} from '../../flightServices/preferred-class.service';
import {CartService} from '../../flightServices/cart.service';
import {Cart} from'../../FlightModel/cart.model';
import {AirCraft} from '../../FlightModel/air-craft.model';
import {AircraftService} from '../../flightServices/aircraft.service';
import {FlightTravellerDetailService} from '../../flightServices/flight-traveller-detail.service';
import {FlightTravellerDetail} from '../../FlightModel/flight-traveller-detail.model'
//import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers:[PreferredClassService,CartService,RouteService,AirportService,AircraftService,FlightTravellerDetailService]
})
export class ConfirmationComponent implements OnInit {
  user:User;
  arr1Length: number;
  userClaims : any;
   preferredclass : PreferredClass;
  route : Route;
  routelist : Array<Route> =[];
  airport : Airport;
  flightbooking: FlightBooking;
  preferredclass1 :Array<PreferredClass> = [];
  StadardPrice: number;
  semiflex: number;
  fullyflex:number;
  business: number;
  total : number;
  time: string;
  arrivaltime: string;
  cart :Cart;
  aircraftname:string;
  aircraft: Array<AirCraft> =[];
  airportlist:Array<Airport> = [];
  cartList : Array<Cart> = [];
  CartTotalPrice : number;
  flighttravellerdetail: FlightTravellerDetail;
  date : string;
  arrivalname: string;
  payments: string;
  preferredclassamount : number;
  specifiedclass : string;
  ToTalExtras: number;
  constructor(private UserService : UserService,private router : Router,private toast : ToastrService,private preferredclassservice : PreferredClassService,public cartservice : CartService,private airportservice: AirportService,private routeservice : RouteService,private aircraftservice : AircraftService,public travellersdetailsService : FlightTravellerDetailService ) { }
 
  ngOnInit() {
this.resertForm();
this.travellersdetailsService.getFlightTravellersDetailsList();
     this.UserService.getUserClaims().subscribe((data: any)=>{
       this.userClaims = data;
     });

     this.payments = localStorage.getItem("Payment");
     this.ToTalExtras = (+localStorage.getItem("Flight&bagcover")) +  (+localStorage.getItem("Extrabags")) + (+localStorage.getItem("SLOWXSLounge"));
  this.cartservice.Getcartlist();
  this.cartservice.getspecifiedCart();
  this.cartservice.cartList.subscribe((classtype:Array<Cart>)=>{
    this. cartList = classtype;
    if(classtype.length > 0){
     this.arr1Length = classtype.length;    
     this.CartTotalPrice = this.cartList[0].Totalprice;
    }
    
  })

this.airportservice.getAirpot();
this.airportservice.getspecifiedAirport();
this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
this.airportlist = classtype;
if(classtype.length > 0){
  this.arr1Length = classtype.length;
  this.time = this.gettime();
  this.date = this.getDate();

}
})

this.aircraftservice.Getaircraftlist();
this.aircraftservice.getspecifiedAirCraft();
this.aircraftservice.specifiedAirCraft.subscribe((classtype:Array<AirCraft>)=>{
this.aircraft = classtype;
if(classtype.length > 0){
  this.arr1Length = classtype.length;
  this.aircraftname = this.getairname();
}
})

this.routeservice.GetRouteList();
this.routeservice.getspecifiedroute();
this.routeservice.specifiedroute.subscribe((classtype:Array<Route>)=>{
this.routelist = classtype;
if(classtype.length > 0){
  this.arr1Length = classtype.length;
  this.arrivaltime = this.getarrtime();
  this.arrivalname = this.getArrival();
}
})

this.preferredclassservice.Getpreferredclasslist();
this.preferredclassservice.Getpreferredclass();
this.preferredclassservice.preferredclassl.subscribe((classtype:Array<PreferredClass>)=>{
this.preferredclass1 = classtype;
if(classtype.length > 0){
 this.arr1Length = classtype.length;    
 
this.specifiedclass = this.getprefferedClass();
this.preferredclassamount = this.getPrefferedClassPrice();
}

})

}

resertForm(form? : NgForm){
  if(form != null)
  form.resetForm();
  this.flightbooking={
    FlightID: 0,
    CustomerID : 0,
    AirportID : 0,
    ExtraID: 0,
    SeatNumber:'',
    ReturningDate: localStorage.getItem("ReturningDate"), 
    NumberOfTravellers:+localStorage.getItem("NumberOfTravellers"),
    TotalFare:0
  }

  if(form != null)
  form.reset();
  this.airport ={
   AirportID: +localStorage.getItem("AirportID"),
  AircraftID:0,
  ArrivalID: 0,
 AirportName: localStorage.getItem("AirportName"),
 DepartingTime:'',
 DepartingDate:''
 }
}
gettime(){
  for(var x =0;x < this.arr1Length; x++){
   if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
     return  this.airportlist[x].DepartingTime;
   }
  }
}
getaircraft(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].AircraftID;
    }
   }
}
getarrivaltime(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].ArrivalID;
    }
   }
}
getairname(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.aircraft[x].AircraftID == this.getaircraft()){
      return  this.aircraft[x].AircraftName;
    }
   }
}

getarrtime(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.routelist[x].ArrivalID == this.getarrivaltime()){
      return  this.routelist[x].ArrivalTime;
    }
   }
}
getDate(){
  for(var x =0;x < this.arr1Length; x++){
    if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].DepartingDate;
    }
   }
}
getArrivalname(){
  for(var x =0;x < this.arr1Length; x++){
    if( this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].ArrivalID;
    }
   }
}
getArrival(){
  for(var x =0;x < this.arr1Length; x++){
    if( this.routelist[x].ArrivalID == this.getArrivalname()){
      return  this.routelist[x].AirportName;
    }
   }
}

getPrefferedClassPrice(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.preferredclass1[x].PreferredClassID == this.cartList[0].PreferredClassID ){
      return  this.preferredclass1[x].Price;
    }
  }
}
getprefferedClass(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.preferredclass1[x].PreferredClassID == this.cartList[0].PreferredClassID ){
      return  this.preferredclass1[x].FlightType;
    }
  }
}

print(){
  window.print();
  for(var x =0;x < this.arr1Length; x++){
 return this.cartservice.DeleteCart(this.cartList[x].CartID).subscribe(x =>{
  this.cartservice.Getcartlist();
  this.cartservice.getspecifiedCart();
  console.log('Deleted');
 })
  }
}
//  @ViewChild('content') content : ElementRef;

//public downloadPDF(){
  //var doc = new jsPDF();

/*  var specialElementHandlers = {
    '#editor' : function(element, renderer){
      return true;
    }
  };

  var content = this.content.nativeElement;
  doc.fromHTML(content.innerHTML, 15, 15,{
  'width': 190,
  'elementHandlers' : specialElementHandlers
  });
doc.save('Ticket.PDF')
}*/
//}
}
