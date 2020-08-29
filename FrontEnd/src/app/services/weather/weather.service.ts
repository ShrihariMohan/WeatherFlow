import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  key: String = '4b2e81ea2d43a4d97e231e3dd2496513' ;

  constructor(private http: HttpClient,private toastr: ToastrService) { }
  public getThings (lat:number , lon:number ) : Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
      exclude=hourly,daily&appid=${this.key}`,null)
      .subscribe(data => res(data)) ,
      err => {console.log(err);
       };
    });
  }

  public getHistory ( lat:number , lon:number ,time:number) : Promise<any> {
    console.log(time) ;
    return new Promise((res, rej) => {
      this.http.post (`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${this.key}`,null)
      .subscribe(data => res(data)) ,
      err => {console.log(err);
       };
    });
  }

  public getWeatherData(city: String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}`,null)
      .subscribe(data => res(data) , 
      (data: Response) => {
      this.toastr.error("Sorry we can't find this city " + data.status) ;
      rej(data)}) 
     
    });
  }

  public getCityByCoords( lat: number , lon: number): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`https://us1.locationiq.com/v1/reverse.php?key=bd319758969d15&lat=${lat}&lon=${lon}&format=json`, null)
      .subscribe(data =>{ 
        console.log(data) ;
        res(data);
      } , 
      data => rej(data.ok)) 
     
    });
  }
  
}
