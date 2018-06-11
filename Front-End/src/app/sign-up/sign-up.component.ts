import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {UserService} from '../shared/user.service';
import{User} from'../shared/user.model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[UserService]

  
})
export class SignUpComponent implements OnInit {
 user: User
 
 
 emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 mobileNumberPattern =" @^(\+[0-9])$";
 GenderPattern="Male" || "Female";
 dateofbirthPattern="yyyy/mm/day";
  constructor(private userService :UserService, private route : Router,private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
    form.reset();
    this.user= {
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
    
    
    this.userService.PostUser(form.value)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       this.resetForm(form);
        this.toastr.success('You Have Successfully Registered',' User Register');
       this.route.navigate(['/sign-in']);
       }); 
     
    
  }
}
