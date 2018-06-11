import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {AdministratorService} from '../shared/administrator.service';
import {Administrator} from '../shared/administrator.model';
import {User} from '../shared/user.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
  providers : [AdministratorService]
 
  
})
export class AdministratorComponent implements OnInit {
administrator : Administrator;


  constructor(public administratorservice : AdministratorService ,private router : Router, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.administratorservice.GetadminstratorList();
     
  }
  resetForm(form? : NgForm)
  {
    if(form != null)
     form.reset();
     this.administratorservice.selectedAdministrator={
      AdministratorID : 0,
      Firstname : '',
      Lastname:'',
      UserName:'',
      Password:''
    }
  }

  onSubmit(form : NgForm){
        this.administratorservice.postAdministrator(form.value)
        .subscribe((data:any) => {
           this.resetForm(form);
            this.toastr.success('You Have Successfully inserted information');
            location.reload();
            }); 
  }
  updatesubmit(form : NgForm){
    this.administratorservice.Putadministrator(form.value.AdministratorID, form.value)
    .subscribe(data => {
      this.resetForm(form);
      this.toastr.info('Record Updated Successfully');
      location.reload();
    })
  }
showForEdit(admin : Administrator ){
  this.administratorservice.selectedAdministrator = Object.assign({}, admin);
}

onDelete(id : number){
  if(confirm("are you sure you want to delete?")==true){
    this.administratorservice.Deleteadministrator(id).subscribe(x =>{
    this.administratorservice.GetadminstratorList();
    this.toastr.warning('Deleted Successfully');
    }
  )
  }
}

  Logout(){
    localStorage.clear();
   // localStorage.removeItem('userToken');
    this.router.navigate(['/sign-in']);
    this.toastr.success('signed out Sucessfully ');
  }
 
}
