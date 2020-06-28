import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { UserTemp } from './user-temp';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  public regUrl = 'http://localhost:3000/register';

  public loginUrl = 'http://localhost:3000/login';
  
  public eventUrl = 'http://localhost:3000/events'

  registerUser(userModel:UserTemp){
    return this.http.post(this.regUrl, userModel, {responseType: 'text'});
  }

  loginUser(userModel:UserTemp){
    return this.http.post(this.loginUrl, userModel);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  
  getEvents(){
    return this.http.get(this.eventUrl, {responseType: 'json'})
  }
  getToken() {
      return localStorage.getItem('token');
  }


}
