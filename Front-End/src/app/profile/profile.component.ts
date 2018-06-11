import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import{User} from'../shared/user.model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[UserService]
})
export class ProfileComponent implements OnInit {
  user: User
  
  constructor(private userService :UserService, private route : Router,private toastr : ToastrService) { }

  ngOnInit() {
  
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
}
