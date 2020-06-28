import { Component, OnInit } from '@angular/core';
import { UserTemp} from '../user-temp';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userModel:UserTemp = {email: '', password:''};
  public error;
  public token;
  
  constructor(private usersSer:UsersService, private route:Router) { }

  ngOnInit(): void {
    
  }
  login(myForm:NgForm){
    this.usersSer.loginUser(this.userModel).subscribe(
      (res:any)=> {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.route.navigate(['/event/event']);
        myForm.reset();
      },
      err => {
        this.error =err;
        console.log(err);
        myForm.reset();
      }  
    )
  }

}

