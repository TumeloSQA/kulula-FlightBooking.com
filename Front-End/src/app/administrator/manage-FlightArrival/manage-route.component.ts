import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Route} from '../../FlightModel/Flight-Arrival.model';
import {RouteService} from '../../flightServices/Flight-Arrival.service';
@Component({
  selector: 'app-manage-route',
  templateUrl: './manage-route.component.html',
  styleUrls: ['./manage-route.component.css'],
  providers:[RouteService]

})
export class ManageRouteComponent implements OnInit {
route : Route;
today = new Date().toJSON().split('T')[0];
  constructor(public routeservice : RouteService, private router : Router, private toastr : ToastrService) { }

  ngOnInit() {
  this.resetForm();
  this.routeservice.GetRouteList();

  }
resetForm(form? : NgForm){
  if(form != null)
     form.reset();
     this.routeservice.selectedroute={
      ArrivalID: 0,
      AirportName: '',
     ArrivalTime: '',
     ArrivalDate: ''
     }
}

onSubmit(form : NgForm){
  this.routeservice.PostRoute(form.value)
  .subscribe((data:any) => {
     this.resetForm(form);
      this.toastr.success('You Have Successfully inserted information');
      location.reload();
      }); 
}

updatesubmit(form : NgForm){
  this.routeservice.PutRoute(form.value.ArrivalID, form.value)
  .subscribe(data => {
    this.resetForm(form);
    this.toastr.info('Record Updated Successfully');
    location.reload();
  })
  }

  showForEdit(route){
    this.routeservice.selectedroute = Object.assign({}, route);
    localStorage.setItem("RouteID", this.routeservice.selectedroute.ArrivalID+'');
    console.log(this.routeservice.selectedroute.ArrivalID)
    }

    onDelete(id : number){
      if(confirm("are you sure you want to delete?")==true){
        this.routeservice.DeleteRoute(id).subscribe(x =>{
        this.routeservice.GetRouteList();
        this.toastr.warning('Deleted Successfully');
        }
      )
      }
    }
}
