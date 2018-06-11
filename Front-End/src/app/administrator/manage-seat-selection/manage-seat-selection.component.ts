import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SeatSelection} from '../../FlightModel/seat-selection.model';
import {SeatSelectionService} from '../../flightServices/seat-selection.service';

@Component({
  selector: 'app-manage-seat-selection',
  templateUrl: './manage-seat-selection.component.html',
  styleUrls: ['./manage-seat-selection.component.css'],
  providers:[SeatSelectionService]
})
export class ManageSeatSelectionComponent implements OnInit {
  seatselection : SeatSelection;
  selectedseat: SeatSelection;
  seatselectionlist : SeatSelection[];
  totals:number;

  constructor(public seatselectionservice : SeatSelectionService,private toast : ToastrService,private router : Router) { }

  ngOnInit() {
    this.resetForm();
   this.seatselectionservice.GetseatselectionList();
  }
  resetForm(form? : NgForm)
  {
     if(form != null)
     form.resetForm();
     this.seatselectionservice.selectedseat={
      SeatType:'',
      SeatNumber:'',
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
}
