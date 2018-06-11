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
import {FlightTravellerDetailService} from '../../flightServices/flight-traveller-detail.service';
import {FlightTravellerDetail} from'../../FlightModel/flight-traveller-detail.model';

@Component({
  selector: 'app-flight-passenger',
  templateUrl: './flight-passenger.component.html',
  styleUrls: ['./flight-passenger.component.css'],
providers:[CartService,PreferredClassService,FlightTravellerDetailService,AirportService,RouteService]
})
export class FlightPassengerComponent implements OnInit {
  user:User;
  arr1Length: number;
  userClaims : any;
  preferredclass : PreferredClass;
  route : Route;
  airport : Airport;
  flightbooking: FlightBooking;
  preferredclass1 :Array<PreferredClass> = [];
  total : number;
  cart :Cart;
  cartList : Array<Cart> = [];
  CartTotalPrice:number;
  flighttravellerdetail :FlightTravellerDetail;
  numberoftravellers: number;
  routelist : Array<Route> =[];
  airportlist:Array<Airport> = [];
 emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 mobileNumberPattern =" @^(\+[0-9])$";
 GenderPattern = "Male" || "Female";
 dateofbirthPattern="yyyy/mm/day";
 date : string;
 arrivalname: string;
 
  constructor(private UserService : UserService,private router : Router,private toast : ToastrService,private preferredclassservice : PreferredClassService,private cartservice : CartService, public travellersdetailsService : FlightTravellerDetailService,private airportservice: AirportService,private routeservice : RouteService) { }

  ngOnInit() {
    this.resetForm();
    this.travellersdetailsService.getFlightTravellersDetailsList();
    this.UserService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
  })

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
    //this.time = this.gettime();
    this.date = this.departureDate();
  }
})
this.routeservice.GetRouteList();
this.routeservice.getspecifiedroute();
this.routeservice.specifiedroute.subscribe((classtype:Array<Route>)=>{
  this.routelist = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
    //this.arrivaltime = this.getarrtime();
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
    if(form != null)
     form.reset();
     this.route={
      ArrivalID: 0,
      AirportName: '',
     ArrivalTime: '',
     ArrivalDate: ''
     }
     if(form != null)
     form.reset();
     this.travellersdetailsService.selectedFlightTravellers={
      TravellerID : 0,
      CustomerID: +localStorage.getItem("CustomerID"),
      SeatNumber: null,
      Firstname : '',
      Lastname : '',
      Dateofbirth : '',
      Gender : '',
      Mobilenumber: '',
      Email : ''
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
    showForEdit(travellersdetails ){
      this.travellersdetailsService.selectedFlightTravellers = Object.assign({}, travellersdetails);
    }
      onSubmit(form? : NgForm){
       if (+localStorage.getItem("NumberOfTravellers") > 0)
        {
          this.travellersdetailsService.PostFlightTravellerDetail(form.value)
          .subscribe((data:any) => {
            if (data.Succeeded == true)
           this.resetForm(form);
           this.numberoftravellers = +localStorage.getItem("NumberOfTravellers") - 1;
           localStorage.setItem("NumberOfTravellers", ''+this.numberoftravellers)
            this.toast.success('Travellers details Sucessfully entered');
           }); 
        } else if (+localStorage.getItem("NumberOfTravellers") < 1)
        {
          var btnPost = document.getElementById ("btnDisable") as HTMLInputElement;
          btnPost.disabled = true;

          this.toast.warning('Error');
        }
        location.reload();
      }
       travellersdetails(){
         this.router.navigate(['/seat-selection'])
       }

}
