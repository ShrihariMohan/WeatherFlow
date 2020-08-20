import { HistoryComponent } from './components/history/history.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: WeatherHomeComponent } ,
  { path: 'home', component: WeatherHomeComponent } ,
  { path : 'new' , component: RegistrationComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'history', component: HistoryComponent},
  { path : '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
