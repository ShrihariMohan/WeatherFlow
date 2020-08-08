import { Weatherdata } from './weatherdata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  historyCity: Weatherdata ;
  username: string ;
  hourlyData  ; 

  constructor() { }
  setHistoryCity( city : Weatherdata ) {
    this.historyCity = city ;
  }

  getHistoryCity() {
    return this.historyCity ;
  }

  setUsername( username: string) {
    this.username = username ;
  }

  getUsername() {
    return this.username ;
  }

  

}
