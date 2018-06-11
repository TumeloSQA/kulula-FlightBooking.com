import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Airport} from '../../FlightModel/Flight-Departure.model';
import {Route} from '../../FlightModel/Flight-Arrival.model';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
import {AirCraft} from '../../FlightModel/air-craft.model';
import {AircraftService} from '../../flightServices/aircraft.service';

@Component({
  selector: 'app-manage-airport',
  templateUrl: './manage-airport.component.html',
  styleUrls: ['./manage-airport.component.css'],
  providers:[AirportService,RouteService,AircraftService]
})
export class ManageAirportComponent implements OnInit {
airports : Airport[];
route : Route;
airport : Airport;
aircraft: AirCraft;
combobox : string ="Select Your Airport";
aircraftcomb : string="Please Select Your Aircraft"
today = new Date().toJSON().split('T')[0];
  constructor(public airportservice : AirportService,public routeservice :RouteService,private toastr : ToastrService, private router : Router,public aicraftservice: AircraftService) { }

  ngOnInit() {
    this.resetForm();
    this.airportservice.getAirpot();
    this.routeservice.GetRouteList();
    this.aicraftservice.Getaircraftlist();
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
     form.reset();
     this.airportservice.sectedAirport ={
      AirportID:0,
     AircraftID:+localStorage.getItem("AircraftID"),
     ArrivalID: +localStorage.getItem("RouteID"),
    AirportName:'',
    DepartingTime:'',
    DepartingDate:''
    }
  }

  routeinfo(route)
  {
      this.combobox = route.AirportName;
      this.routeservice.selectedroute = Object.assign({}, route);
      localStorage.setItem("RouteID", this.routeservice.selectedroute.ArrivalID+'');
      localStorage.setItem("RouteName", this.routeservice.selectedroute.AirportName+'');
  }
aircraftinfo(aircraft){
  this.aircraftcomb = aircraft.AircraftName;
  this.aicraftservice.selectedaircraft = Object.assign({}, aircraft);
  localStorage.setItem("AircraftID", this.aicraftservice.selectedaircraft.AircraftID+'');
  localStorage.setItem("AircraftName", this.aicraftservice.selectedaircraft.AircraftName+'');
}

  onSubmit(form : NgForm){
   
    this.airportservice.PostAirport(form.value)
    .subscribe((data:any) => {
       this.resetForm(form);
     //  this.airportservice.getAirpot();
        this.toastr.success('You Have Successfully inserted information');
        location.reload();
        }); 
      

}
updatesubmit(form : NgForm){
this.airportservice.Putairport(form.value.AirportID, form.value)
.subscribe(data => {
  this.resetForm(form);
  this.toastr.info('Record Updated Successfully');
  location.reload();
})
}
showForEdit(airport ){
  this.airportservice.sectedAirport = Object.assign({}, airport);
  }
  
  onDelete(id : number){
    if(confirm("are you sure you want to delete?")==true){
      this.airportservice.DeleteAirport(id).subscribe(x =>{
      this.airportservice.getAirpot();
      this.toastr.warning('Deleted Successfully');
      
      }
    )
    }
  }
}
