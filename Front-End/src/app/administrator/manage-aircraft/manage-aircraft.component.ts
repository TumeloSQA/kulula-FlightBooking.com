import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AirCraft} from '../../FlightModel/air-craft.model';
import {AircraftService} from '../../flightServices/aircraft.service';

@Component({
  selector: 'app-manage-aircraft',
  templateUrl: './manage-aircraft.component.html',
  styleUrls: ['./manage-aircraft.component.css'],
  providers:[AircraftService]
})
export class ManageAircraftComponent implements OnInit {
aircraft : AirCraft;
  constructor(public aicraftservice: AircraftService,private router : Router, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.aicraftservice.Getaircraftlist();
    this.aicraftservice.getspecifiedAirCraft();
  }
resetForm(form? : NgForm){
  if(form != null)
  form.reset();
  this.aicraftservice.selectedaircraft={
    AircraftID: 0,
    AircraftName: '',
    CarrierName: ''
  }
}

onSubmit(form : NgForm){
  this.aicraftservice.PostAircraft(form.value)
  .subscribe((data:any) => {
     this.resetForm(form);
      this.toastr.success('You Have Successfully inserted information');
      location.reload();
      }); 
}

updatesubmit(form : NgForm){
  this.aicraftservice.PutAircraft(form.value.ArrivalID, form.value)
  .subscribe(data => {
    this.resetForm(form);
    this.toastr.info('Record Updated Successfully');
    location.reload();
  })
  }

  showForEdit(aircraft){
    this.aicraftservice.selectedaircraft = Object.assign({}, aircraft);
    localStorage.setItem("RouteID",this.aicraftservice.selectedaircraft.AircraftID+'');
    console.log(this.aicraftservice.selectedaircraft.AircraftID)
    }

    onDelete(id : number){
      if(confirm("are you sure you want to delete?")==true){
        this.aicraftservice.DeleteAircrafts(id).subscribe(x =>{
        this.aicraftservice.Getaircraftlist();
        this.toastr.warning('Deleted Successfully');
        }
      )
      }
    }
}
