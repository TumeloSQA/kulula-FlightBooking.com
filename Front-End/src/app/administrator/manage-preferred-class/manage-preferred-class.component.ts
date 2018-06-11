import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PreferredClass} from '../../FlightModel/preferred-class.model';
import {PreferredClassService} from '../../flightServices/preferred-class.service';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {Airport} from '../../FlightModel/Flight-Departure.model';

@Component({
  selector: 'app-manage-preferred-class',
  templateUrl: './manage-preferred-class.component.html',
  styleUrls: ['./manage-preferred-class.component.css'],
  providers:[PreferredClassService,AirportService]
})
export class ManagePreferredClassComponent implements OnInit {
  
preferredclass : PreferredClass;
combo: string="Select Your Airport";
airport: Airport;
  constructor(public preferredclassservice: PreferredClassService, private router : Router, private toastr :ToastrService,public airportservice : AirportService ) { }

  ngOnInit() {
    this.resetForm();
   this.preferredclassservice.Getpreferredclasslist();
   this.airportservice.getAirpot();
  }

  resetForm(form? : NgForm){
    if(form != null)
       form.reset();
       this.preferredclassservice.selectedClass={
        PreferredClassID:0,
        AirportID: +localStorage.getItem("AirportID"),
        PreferredClassType:'',
        FlightType:'',
        Price:0,
        Quantity:0,
        Total:0
       }
  }
  onSubmit(form : NgForm){

   this.preferredclassservice.Postpreferredclass(form.value)
    .subscribe((data:any) => {
       this.resetForm(form);
        this.toastr.success('You Have Successfully inserted information');
        location.reload();
        }); 
  }
  updatesubmit(form : NgForm){
   this.preferredclassservice.Putpreferredclass(form.value.PreferredClassID, form.value)
    .subscribe(data => {
      this.resetForm(form);
      this.airportservice.getAirpot();
      this.toastr.info('Record Updated Successfully');
      location.reload();
    })
    }
    showForEdit(preferredclass){
      this.preferredclassservice.selectedClass = Object.assign({}, preferredclass);
      localStorage.setItem("PreferredClassID", this.preferredclassservice.selectedClass.PreferredClassID+'');
      
     // console.log( this.preferredclassservice.selectedClass.PreferredClassID)
      }
  
      onDelete(id : number){
        if(confirm("are you sure you want to delete?")==true){
          this.preferredclassservice.Deletepreferredclass(id).subscribe(x =>{
         this.preferredclassservice.Getpreferredclasslist();
          this.toastr.warning('Deleted Successfully');
          }
        )
        }
      }

      airportinfor(airport){
        this.combo = airport.AirportName;
        this.airportservice.sectedAirport = Object.assign({}, airport);
        localStorage.setItem('AirportID', this.airportservice.sectedAirport.AirportID+'');
         localStorage.setItem('AirportName', this.airportservice.sectedAirport.AirportName+'');
        }
}
