import { Component, OnInit } from '@angular/core';
import {ProfileComponent} from '../profile.component';
import {UserDetailsService} from '../detailedUser/user-details.service';
import {Customer} from '../detailedUser/customer';
import {NgForm} from '@angular/forms';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [UserDetailsService]
})
export class AccountSettingsComponent implements OnInit {
customer: Customer;
profilecomponent : ProfileComponent;
userClaims : any;
id : number;
passwordConfirmationFailed = false;
  constructor(private userDetailsService : UserDetailsService, private toastr : ToastrService, private router : Router) { }

  ngOnInit() {
    this.resetForm();
    this.userDetailsService.getUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
      console.log(this.userClaims.CustomerID);
      this.id = this.userClaims.CustomerID;
    });
   // console.log(this.userClaims.Password+" "+this.customer.Password)
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
  

  onSubmit(form? : NgForm){
   /* if (this.customer.Password == this.userClaims.Password) {
      this.passwordConfirmationFailed = true;
      //console.log(this.userClaims.Password,this.customer.Password)
    //  this.toastr.success("correct password")*/
    
  this.userDetailsService.putUser(form.value.CustomerID, form.value)
  .subscribe(data => {
    this.resetForm(form);
   //this.userdetailComponent.getUserClaims();
    this.toastr.info('Record Updated Successfully');
  ;
  })
 }
/* else {
  this.passwordConfirmationFailed = false;
 // console.log(this.userClaims.Password,this.customer.Password);
  this.toastr.warning("incorrect password")
}*/
  }

