import { FavCity } from './fav-city';
import { Injectable } from '@angular/core';
import {User} from './user' ;
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userID : number = 0;
  observe : Observable<any> ;
  key: String = '4b2e81ea2d43a4d97e231e3dd2496513' ;
  dt:number ;
  username : string
  constructor(private http: HttpClient,private toastr: ToastrService ) { }

  public loginUserFromRemote(user: User): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/login`,user,{responseType: 'text'})
      .subscribe(data => res(data)) ,
      err => {console.log(err + 'hello');
       };
    });
}

public getUserFromRemote(): Promise<any> {
  return new Promise((res, rej) => {
    this.http.get (`http://localhost:9000/name`,{responseType: 'text'})
    .subscribe(data => {res(data) ,
     this.toastr.success(`Hello ${data.charAt(0).toUpperCase() + data.slice(1)}, You are successfully logged in` );}, 
       data => {rej(null) ;
       console.log(data)}) 

  });
}


  public registerUserFromRemote(user: User): Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.post ('http://localhost:9000/new', user,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }
  

 
  public getWeatherData(city: String): Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.post (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}`,null)
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }

  public getCityByCoords( lat: number , lon: number): Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.post (`https://us1.locationiq.com/v1/reverse.php?key=bd319758969d15&lat=${lat}&lon=${lon}&format=json`, null)
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }

 

  public getFavouritesFromRemote ( ): Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:9000/fav/`) 
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }

  

  public saveFavCityFromRemote ( city: FavCity) : Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/data`,city  ,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }

  public deleteCityFromRemote (id : number) : Promise<any> {
    //return this.http.post('http://localhost:9000/new', user,{responseType: 'text'}) ;
    return new Promise((res, rej) => {
      this.http.delete (`http://localhost:9000/del/${id}` ,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }


  public getWeatherMaps () : Observable<any> {
    return this.http.post(`https://tile.openweathermap.org/map/clouds_new/3/3/3.png?appid=${this.key}`,null) ;
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

  public getThings (lat:number , lon:number ) : Promise<any> {
    
    return new Promise((res, rej) => {
      this.http.post (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
      exclude=hourly,daily&appid=${this.key}`,null)
      .subscribe(data => res(data)) ,
      err => {console.log(err);
       };
    });
  }

  public logOutUserFromRemote( ): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/logout`,{responseType: 'text'})
      .subscribe(data => res(data)) ,
      err => {console.log(err );
       };
    });
}
}
