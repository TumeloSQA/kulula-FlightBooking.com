import { Component, OnInit } from '@angular/core';
import{User} from'../shared/user.model'
import {UserService} from '../shared/user.service';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Administrator} from '../shared/administrator.model';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User
  administrator :Administrator;
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router, private toastr : ToastrService) { }

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
    if(form != null)
    form.reset();
    this.administrator= {
      AdministratorID: null,
      Firstname:'',
      Lastname:'',
      UserName:'',
      Password:'',
 
    }

  }
  OnSubmit(UserName,Password){
console.log(UserName.substr(-16));
    if(UserName.substr(-16) == "Admin@kulula.com"){
      this.userService.userAuthentication(UserName,Password).subscribe((data : any)=>{
        localStorage.setItem('userToken', data.access_token);
        this.toastr.success('WELCOME ADMINISTRATOR KHUMOZIN');
        this.router.navigate(['/administrator'])
        },
           
        (err : HttpErrorResponse)=>{
        this.isLoginError = true;
        this.toastr.error('incorrect password & Username');
        });
    }
   else{ 
this.userService.userAuthentication(UserName,Password).subscribe((data : any)=>{
localStorage.setItem('userToken', data.access_token);
this.toastr.success('WELCOME ',UserName);
this.router.navigate(['/homepage'])
},
   
(err : HttpErrorResponse)=>{
this.isLoginError = true;
this.toastr.error('incorrect password & Username');
});
} 
}

}
