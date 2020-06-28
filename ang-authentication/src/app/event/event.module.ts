import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [LayoutComponent, EventsComponent],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
