import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public events:any = [];
  public shown;
  constructor(private usersSer:UsersService, private authGu:AuthGuard) { }

  ngOnInit(): void {
    this.usersSer.getEvents().subscribe(
      data => {
        this.events = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

}
