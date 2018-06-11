import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FlightExtraService} from '../../flightServices/flight-extra.service';
import {FlightExtra} from '../../FlightModel/flight-extra.model';
@Component({
  selector: 'app-manage-flight-extras',
  templateUrl: './manage-flight-extras.component.html',
  styleUrls: ['./manage-flight-extras.component.css'],
  providers: [FlightExtraService]
})
export class ManageFlightExtrasComponent implements OnInit {
flightextra : FlightExtra;

  constructor(public fightextraservice : FlightExtraService, private toastr : ToastrService, private route : Router) { }

  ngOnInit() {
      this.resetForm();
    this.fightextraservice.GetFlightExtra();
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
     form.reset();
     this.fightextraservice.selectedflightextra ={
      ExtraID: 0,
      FlightextraType:'',
      Price:0,
      Quantity:0,
      TotalPrice:0
  }
}

  onSubmit(form : NgForm){
    this.fightextraservice.PostFlightExtra(form.value)
    .subscribe((data:any) => {
       this.resetForm(form);
        this.toastr.success('You Have Successfully inserted information');
        location.reload();
        }); 
}
updatesubmit(form : NgForm){
  this.fightextraservice.PutFlightEtras(form.value.ExtraID, form.value)
  .subscribe(data => {
    this.resetForm(form);
    this.toastr.info('Record Updated Successfully');
    location.reload();
  })
  }
  showForEdit(flightextra ){
    this.fightextraservice.selectedflightextra = Object.assign({}, flightextra);
    localStorage.setItem("flightextra", this.fightextraservice.selectedflightextra.ExtraID+'');
    }

    onDelete(id : number){
      if(confirm("are you sure you want to delete?")==true){
        this.fightextraservice.DeleteFlightExtras(id).subscribe(x =>{
        this.fightextraservice.GetFlightExtra();
        this.toastr.warning('Deleted Successfully');
        }
      )
      }
    }
}
