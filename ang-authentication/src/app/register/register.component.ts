import { Component, OnInit } from '@angular/core';
import { UserTemp } from '../user-temp';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userModel:UserTemp = {email: '', password:''};
  public success;
  public error = '';
  constructor(private usersSer:UsersService, private route:Router) { }

  ngOnInit(): void {
  }
  formSubmit(myForm: NgForm){
    this.error = '';
    this.success = '';
    console.log(this.error);
    if(this.userModel.email && this.userModel.password){
      console.log(myForm);
      this.usersSer.registerUser(this.userModel).subscribe(
        data => {
            this.success = 'successfully registered';
            console.log(this.success);
            
        },
        err => {
          if(err.status == 401){
            this.error = 'Users Already Registered';
            console.log(err);
            console.log(this.error);
          }
        }
      )
    }
    
    myForm.reset();
  }
}
