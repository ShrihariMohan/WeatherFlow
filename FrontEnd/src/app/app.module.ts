import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms' ;
import {HttpClientModule} from '@angular/common/http';
import { WeatherHomeComponent } from './weather-home/weather-home.component';
import { HistoryComponent } from './history/history.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';   // use this
import {HttpRequestInterceptor} from '../app/http-request-interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WeatherHomeComponent,
    HistoryComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule ,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 1, timeout: 4000, position: 'right'}),
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
