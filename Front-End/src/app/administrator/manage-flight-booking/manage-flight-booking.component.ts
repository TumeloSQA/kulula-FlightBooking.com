import { Component, OnInit } from '@angular/core';
import {FlightBooking} from '../../FlightModel/flight-booking.model';
import {FlightBookingService} from '../../flightServices/flight-booking.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import{User} from'../../shared/user.model';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-manage-flight-booking',
  templateUrl: './manage-flight-booking.component.html',
  styleUrls: ['./manage-flight-booking.component.css'],
  providers:[FlightBookingService,AirportService,UserService]
})
export class ManageFlightBookingComponent implements OnInit {

  flightbooking : FlightBooking
  airportlist:Array<Airport> = [];
  arr1Length: number;
  airportname :string;
  Customerlist:Array<User> = []
  username : string; 
  constructor(public flightbookingservice : FlightBookingService,private toastr : ToastrService, private airportservice : AirportService,private userservice : UserService) { }

  ngOnInit() {
    this.flightbookingservice.getFlightBooking();


 this.airportservice.getAirpot();
this.airportservice.getspecifiedAirport();
this.airportservice.specifiedAirport.subscribe((classtype:Array<Airport>)=>{
  this.airportlist = classtype;
  if(classtype.length > 0){
    this.arr1Length = classtype.length;
this.airportname = this.getairportname();
  }
})

this.userservice.getspecifiedcustomer();
this.userservice.specifiedCustomer.subscribe((classtype:Array<User>)=>{
this.Customerlist = classtype;
if(classtype.length > 0){
  this.arr1Length = classtype.length;
this.username = this.getcustomername();
}
})
}

getcustomername(){
  for(var x =0; x < this.arr1Length; x++){
    if(this.Customerlist[x].CustomerID == this.flightbooking.CustomerID ){
       return this.Customerlist[x].UserName;
    }
  }
}

getairportname(){
  for(var x =0;x < this.arr1Length; x++){
    if( this.airportlist[x].AirportID == this.flightbooking.AirportID){
      return  this.airportlist[x].AirportName;
    }
   }
}

  onDelete(id : number){
    if(confirm("are you sure you want to delete?")==true){
      this.flightbookingservice.DeleteFlight(id).subscribe(x =>{
      this.flightbookingservice.getFlightBooking();
      this.toastr.warning('Deleted Successfully');
      
      }
    )
    }
  }
}
