import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-flight-economy-class',
  templateUrl: './flight-economy-class.component.html',
  styleUrls: ['./flight-economy-class.component.css'],
 providers:[PreferredClassService,CartService,RouteService,AirportService,AircraftService]
})
export class FlightEconomyClassComponent implements OnInit {
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
  date : string;
  arrivalname: string;
  constructor(private UserService : UserService,private router : Router,private toast : ToastrService,private preferredclassservice : PreferredClassService,private cartservice : CartService,private airportservice: AirportService,private routeservice : RouteService,private aircraftservice : AircraftService) { }

  ngOnInit() {

    this.resetForm();
    this.UserService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
    
    this.cartservice.getspecifiedCart();
    this.cartservice.cartList.subscribe((classtype:Array<Cart>)=>{
      this. cartList = classtype;
      if(classtype.length > 0){
       this.arr1Length = classtype.length;    
       this.CartTotalPrice = this.cartList[0].Totalprice;
      }
      
    })
  this.preferredclassservice.Getpreferredclasslist();
  this.preferredclassservice.Getpreferredclass();
 this.preferredclassservice.preferredclassl.subscribe((classtype:Array<PreferredClass>)=>{
  this.preferredclass1 = classtype;
  if(classtype.length > 0){
   this.arr1Length = classtype.length;    
   
this.StadardPrice = this.getclassStandardprice()
this.semiflex = this.getclassSemiflex()
this.fullyflex = this.getclassfullyflex()

  }
  
})
this.airportservice.getAirpot();
this.airportservice.getspecifiedAirport();
this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
  this.airportlist = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
    this.time = this.gettime();
    this.date = this.departureDate();
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
    this.arrivalname = this.getArrival()
  }
})
  }
  resetForm(form? : NgForm)
  {
     if(form != null)
     form.resetForm();
     this.flightbooking={
       FlightID: 0,
       CustomerID : 0,
       AirportID : 0,
       ExtraID: 0,
       SeatNumber: '',
       ReturningDate: localStorage.getItem("ReturningDate") , 
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
    if(form != null)
     form.reset();
     this.route={
      ArrivalID: 0,
      AirportName: '',
     ArrivalTime: '',
     ArrivalDate: ''
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

getclassStandardprice(){
      for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){
      if(this.preferredclass1[x].FlightType =='Standard'){
    return this.preferredclass1[x].Price;
      }
    }

      }
      
    }
getclassSemiflex(){
  for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){ 
    if(this.preferredclass1[x].FlightType == 'Semi-Flexi'){
    return this.preferredclass1[x].Price;
    }
    }

      }
}
getclassfullyflex(){
  for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){
    if(this.preferredclass1[x].FlightType == 'Fully Flex'){
    return this.preferredclass1[x].Price;
    }
    }

      }
}

prefferedclassIDStandard(){
  for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){
    if(this.preferredclass1[x].FlightType == 'Standard'){
    return this.preferredclass1[x].PreferredClassID;
    }
    }

      }
}

prefferedclassIDSemiflex(){
  for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){
    if(this.preferredclass1[x].FlightType == 'Semi-Flexi'){
    return this.preferredclass1[x].PreferredClassID;
    }
    }

      }
}

prefferedclassIDfullyflex(){
  for(var x =0;x < this.arr1Length; x++ ){
    if(this.preferredclass1[x].AirportID == +localStorage.getItem("AirportID") ){
    if(this.preferredclass1[x].FlightType == 'Fully Flex'){
    return this.preferredclass1[x].PreferredClassID;
    }
    }
 }
}
 departureDate(){
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
addCArtStandard(preferredclass : PreferredClass){
this.cart ={
  CartID: 0,
  SeatNumber: null,
  PreferredClassID: this.prefferedclassIDStandard(),
  ExtraID :null,
  Totalprice: +localStorage.getItem("NumberOfTravellers") * (+this.StadardPrice),
  Quantity: +localStorage.getItem("NumberOfTravellers") 
}
this.cartservice.PostCart(this.cart).subscribe(data =>{
  this.cartservice.getspecifiedCart()
  localStorage.setItem('PreferredClassID', this.prefferedclassIDSemiflex()+'');
  this.toast.info('Added to Cart!');
});
}

addCArtSemiflex(preferredclass : PreferredClass){
  this.cart ={
    CartID: 0,
    SeatNumber:null,
    PreferredClassID: this.prefferedclassIDSemiflex(),
    ExtraID :null,
    Totalprice: +localStorage.getItem("NumberOfTravellers") * (+this.semiflex),
    Quantity: +localStorage.getItem("NumberOfTravellers") 
  }
  this.cartservice.PostCart(this.cart).subscribe(data =>{
    this.cartservice.getspecifiedCart()
    localStorage.setItem('PreferredClassID', this.prefferedclassIDSemiflex()+'');
    this.toast.info('Added to Cart!');
  });
  }

  addCArtFullyflex(preferredclass : PreferredClass){
    this.cart ={
      CartID: 0,
      SeatNumber: null,
      PreferredClassID: this.prefferedclassIDfullyflex(),
      ExtraID :null,
      Totalprice: +localStorage.getItem("NumberOfTravellers") * (+this.fullyflex),
      Quantity: +localStorage.getItem("NumberOfTravellers") 
    }
    this.cartservice.PostCart(this.cart).subscribe(data =>{
      this.cartservice.getspecifiedCart()
      localStorage.setItem('PreferredClassID', this.prefferedclassIDfullyflex()+'');
      this.toast.info('Added to Cart!');
    });
    }
travellersdetails(){
  this.router.navigate(['/flight-passenger']);
}
  }
