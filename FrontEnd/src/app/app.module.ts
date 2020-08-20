import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component'
import {FormsModule} from '@angular/forms' ;
import {HttpClientModule} from '@angular/common/http';
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';
import { HistoryComponent } from './components/history/history.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';   // use this
import {HttpRequestInterceptor} from '../app/http-request-interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WeatherHomeComponent,
    HistoryComponent,
    NotFoundComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule ,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      maxOpened:1,
      closeButton:true
    }),
    NgxSpinnerModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
