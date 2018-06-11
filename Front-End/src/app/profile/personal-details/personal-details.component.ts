import { Component, OnInit } from '@angular/core';
import {ProfileComponent} from '../profile.component';
import {UserDetailsService} from '../detailedUser/user-details.service';
import {Customer} from '../detailedUser/customer';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  providers: [UserDetailsService]
})
export class PersonalDetailsComponent implements OnInit {
customer: Customer;
id : number;
profilecomponent : ProfileComponent;
userClaims : any;
 emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 mobileNumberPattern =" @^(\+[0-9])$";
 GenderPattern = "Male" || "Female";
 dateofbirthPattern="yyyy/mm/day";
  constructor(private userdetailComponent: UserDetailsService, private toastr : ToastrService, private router : Router ) { }

  ngOnInit() {
    this.resetForm();
    this.userdetailComponent.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
      console.log(this.userClaims);
      this.id = this.userClaims.CustomerID;
    });
  }
  resetForm(form? : NgForm){
    if(form != null)
    form.reset();
    this.customer= {
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
}
//user Profile Update/////
onSubmit(form? : NgForm){

  this.userdetailComponent.putUser(form.value.CustomerID, form.value)
  .subscribe(data => {
    this.resetForm(form);
   //this.userdetailComponent.getUserClaims();
    this.toastr.info('Record Updated Successfully');
  ;
  })

   //if()
}

}
