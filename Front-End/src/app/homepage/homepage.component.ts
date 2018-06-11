import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{User} from'../shared/user.model';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import {ToastrService} from 'ngx-toastr';
import {Route} from '../FlightModel/Flight-Arrival.model';
import {Airport} from '../FlightModel/Flight-Departure.model';
import {RouteService} from '../flightServices/Flight-Arrival.service';
import {AirportService} from '../flightServices/Flight-Departure.service';
import {FlightBooking} from '../FlightModel/flight-booking.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[AirportService,RouteService]
})
export class HompageComponent implements OnInit {
userClaims : any;
user:User;
route: Route;
airport : Airport;
combobox :string ="Select Your Airport";
combo: string=localStorage.getItem("AirportName");
preferred: string="Preferred Class";
preferredclass: string[];
flightbooking: FlightBooking;
today = new Date().toJSON().split('T')[0];
arrivaltime: string;
routelist : Array<Route> =[];
time: string;
arr1Length: number;
airportlist:Array<Airport> = [];
  constructor(private router : Router,private UserService : UserService,public airportservice : AirportService,public routeservice :RouteService, private toastr : ToastrService) { }

  ngOnInit() {
    this.preferredclass = ['Economy', 'Business'];
    this.resetForm();
  this.UserService.getUserClaims().subscribe((data: any)=>{
  this.userClaims = data;
 localStorage.setItem("CustomerID", this.userClaims.CustomerID+'');
});
this.airportservice.getAirpot();
this.airportservice.getspecifiedAirport();
this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
  this.airportlist = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
   console.log(this.getarrivalid())
  }
})
    this.routeservice.GetRouteList();
this.routeservice.getspecifiedroute();
this.routeservice.specifiedroute.subscribe((classtype:Array<Route>)=>{
  this.routelist = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
  this.time = this.getarrivalname();
  }
})
}
resetForm(form? : NgForm)
{
  if(form != null)
  form.reset();
  this.user= {
  CustomerID: null,
  Firstname:'',
  Lastname: '',
  dateofbirth: '',
  Gender: '',
  MobileNumbers: '', 
  Email: '',
  UserName: '',
  Password:'',
  }
  if(form != null)
  form.resetForm();
  this.flightbooking={
    FlightID: 0,
    CustomerID : 0,
    AirportID : 0,
    ExtraID: 0,
    SeatNumber:'',
    ReturningDate:'', 
    NumberOfTravellers:1,
    TotalFare:0,
  }
}
getarrivalid(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].ArrivalID;
    }
   }
}

getdate(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.airportlist[x].AirportID == +localStorage.getItem("AirportID")){
      return  this.airportlist[x].DepartingDate;
    }
   }
}
getarrivalname(){
  for(var x =0;x < this.arr1Length; x++){
    if(this.routelist[x].ArrivalID == this.getarrivalid()){
      return  this.routelist[x].AirportName;
    }
   }
}


routeinfo(route)
{
    this.combobox = this.time;
    this.routeservice.selectedroute = Object.assign({}, route);
}
airportinfor(airport){
this.combo = airport.AirportName;
this.airportservice.sectedAirport = Object.assign({}, airport);
localStorage.setItem('AirportID', this.airportservice.sectedAirport.AirportID+'');
 localStorage.setItem('AirportName', this.airportservice.sectedAirport.AirportName+'');
 location.reload();
}

preferredClas(x){
 var clas =x
this.preferred = clas;
}
onSubmit(form : NgForm){
  if(this.user.dateofbirth == this.getdate()){
  localStorage.setItem("DepartingDate",this.user.dateofbirth+'');
  localStorage.setItem("ReturningDate",this.flightbooking.ReturningDate+'');
  localStorage.setItem("NumberOfTravellers",this.flightbooking.NumberOfTravellers+'');
  if(this.preferred == 'Economy'){
    this.router.navigate(['/flight-economy-class'])
  }
  else {
    this.router.navigate(['/flight-business-class'])
  }
} else {
  this.toastr.error("the flight You searched for Does not Exist check your date")
}
} 

Logout(){
  localStorage.clear();
 // localStorage.removeItem('userToken');
  this.router.navigate(['/sign-in']);
  this.toastr.success('signed out Sucessfully')
}

}
