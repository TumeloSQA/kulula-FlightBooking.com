import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SeatSelection} from '../../FlightModel/seat-selection.model';
import {SeatSelectionService} from '../../flightServices/seat-selection.service';
import {AirportService} from '../../flightServices/Flight-Departure.service';
import {Airport} from '../../FlightModel/Flight-Departure.model';

@Component({
  selector: 'app-manage-seat-selection',
  templateUrl: './manage-seat-selection.component.html',
  styleUrls: ['./manage-seat-selection.component.css'],
  providers:[SeatSelectionService,AirportService]
})
export class ManageSeatSelectionComponent implements OnInit {
  seatselection : SeatSelection;
  selectedseat: SeatSelection;
  seatselectionlist : SeatSelection[];
  totals:number;
  combo: string="Select Your Airport";
  airport: Airport;
  constructor(public seatselectionservice : SeatSelectionService,private toast : ToastrService,private router : Router, public airportservice : AirportService) { }

  ngOnInit() {
    this.resetForm();
    this.airportservice.getAirpot();
   this.seatselectionservice.GetseatselectionList();
  }
  resetForm(form? : NgForm)
  {
     if(form != null)
     form.resetForm();
     this.seatselectionservice.selectedseat={
      SeatType:'',
      SeatNumber:'',
      AirportID: +localStorage.getItem("AirportID"),
      Price : 0,
      Quantity: 0,
      Total : 0
     }
    }
    onSubmit(form : NgForm){
    
      this.seatselectionservice.Postseatselection(form.value)
       .subscribe((data:any) => {
          this.resetForm(form);
           this.toast.success('You Have Successfully inserted information');
           location.reload();
           }); 
     }
     updatesubmit(form : NgForm){
      this.seatselectionservice.Putseatselections(form.value.SeatNumber, form.value)
       .subscribe(data => {
         this.resetForm(form);
         this.toast.info('Record Updated Successfully');
         location.reload();
       })
       }
       showForEdit(seatselection :SeatSelection){
          this.seatselectionservice.selectedseat = Object.assign({}, seatselection);
        
         }
     
         onDelete(id : number){
           if(confirm("are you sure you want to delete?")==true){
            this.seatselectionservice.Deleteseatselection(id).subscribe(x =>{
            this.seatselectionservice.GetseatselectionList();
             this.toast.warning('Deleted Successfully');
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
