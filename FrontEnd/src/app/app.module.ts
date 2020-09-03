import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms' ;
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component'
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';
import { HistoryComponent } from './components/history/history.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {HttpRequestInterceptor} from '../app/interceptors/http-request-interceptor';

import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WeatherHomeComponent,
    HistoryComponent,
    NotFoundComponent,
    LandingPageComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule ,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
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
