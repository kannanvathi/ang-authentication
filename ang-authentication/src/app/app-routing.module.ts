import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { EventsComponent } from './events/events.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'events', component: EventsComponent, canActivate:[AuthGuard]},
  { path: 'event',
  loadChildren: () => import('./event/event.module').then(m => m.EventModule), canActivate:[AuthGuard]},
  { path: '**', redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }