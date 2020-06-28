import { Injectable, Injector, SkipSelf } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(UsersService);
    const token = localStorage.getItem('token');
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', `Bearer ${authService.getToken()}`)
      }
    )
    return next.handle(tokenizedReq)
  }
}