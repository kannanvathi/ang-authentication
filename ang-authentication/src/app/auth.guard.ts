import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authSer:UsersService, private router:Router){}
canActivate():boolean{
  if(this.authSer.loggedIn()){
    return true;
  }
  else{
    this.router.navigate(['/login']);
    return false;
  }
}
  
}
