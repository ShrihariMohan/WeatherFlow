import { HistoryComponent } from './history/history.component';
import { RegistrationComponent } from './registration/registration.component';
import { WeatherHomeComponent } from './weather-home/weather-home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: WeatherHomeComponent } ,
  { path: 'home', component: WeatherHomeComponent } ,
  { path : 'new' , component: RegistrationComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'history', component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
