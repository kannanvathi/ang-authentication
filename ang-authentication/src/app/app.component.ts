import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-authentication';
  public isAccess = false;

constructor(private userSer:UsersService){}
  ngOnInit(): void {
    console.log('nginit');
    if(this.userSer.loggedIn()){
        this.isAccess = true;

    }
  }
  ngOnChanges():void{
    if(this.userSer.loggedIn()){
      this.isAccess = true;
      
  }
  }

}
