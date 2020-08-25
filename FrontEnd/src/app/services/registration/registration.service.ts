import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import { FavCity } from '../../POJO/favCity/fav-city';
import { User } from '../../POJO/user/user' ;

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userID : number = 0;
  observe : Observable<any> ;
  dt:number ;
  constructor(private http: HttpClient,private toastr: ToastrService ) { }

  public loginUserFromRemote(user: User): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/login`,user,{responseType: 'text'})
      .subscribe(data => res(data)) ,
      err => rej(err)
    });
}

public getUserFromRemote(): Promise<any> {
  try {
  return new Promise((res, rej) => {
    this.http.get (`http://localhost:9000/name`,{responseType: 'text' })
    .subscribe(data => {
      res(data) ;
     this.toastr.success(`Hello ${data.charAt(0).toUpperCase() + data.slice(1)}, You are successfully logged in` );}, 
       (data : Error) => {; 
       console.log(data) ;
       this.toastr.warning("You are not logged in");

       rej(data) }) 

  });
  }
  catch {
    console.log("hello i am error") ;
    return ;
  }
}


  public registerUserFromRemote(user: User): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post ('http://localhost:9000/new', user,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }
  
  public getFavouritesFromRemote ( ): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:9000/fav/`) 
      .subscribe(data =>{ 
        console.log(data) ;res(data);} , 
      data => {rej(data.ok);
      console.log(data)}) 
     
    });
  }

  public saveFavCityFromRemote ( city: FavCity) : Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/data`,city  ,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej(data.ok)) 
     
    });
  }

  public deleteCityFromRemote (id : number) : Promise<any> {
    return new Promise((res, rej) => {
      this.http.delete (`http://localhost:9000/del/${id}` ,{responseType: 'text'})
      .subscribe(data => res(data) , 
      data => rej("false")) 
     
    });
  }

  public logOutUserFromRemote( ): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:9000/logout`,{responseType: 'text'})
      .subscribe(data => res(data)) ,
      err => rej("error") 
    });
  }
}
