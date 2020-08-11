import { FavCity } from './../fav-city';
import { CityWeatherData } from './../city-weather-data';
import { RegistrationService } from './../registration.service';
import { Weatherdata } from './../weatherdata';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";





@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})

export class WeatherHomeComponent implements OnInit {

  data = new Weatherdata() ;
  temp: any ;
  cityData = new CityWeatherData() ;
  dataKeys: object = Object.keys(this.cityData) ;
  lat: number ;
  lon: number ;
  username: string = null;
  favCity = new FavCity() ;
  favCities  = {  } ;
  favCityNames : any ;
  history = [] ;
  historyTemp : any[] =[]
  historyDay : any[] =[]  
  hourlyData :any[];
  already:boolean = true ;
  

  constructor( private service: RegistrationService  ,
    private route : Router ,private toastr: ToastrService ,
    private spinner: NgxSpinnerService) {
    }

  async ngOnInit() {
    this.spinner.show()
    this.getLocation() ;
    try {
      this.username =  await this.service.getUserFromRemote();
      this.username = (this.username).slice(0,1).toUpperCase() + this.username.slice(1) ;
    }
    catch (err) {
      console.log('name error') ;
      return ;
    } 
    this.getFavourites() ;
}
 




  async getLocation() {
    if ( 'geolocation' in navigator ) {
      navigator.geolocation.watchPosition(async (position) => {
        this.lat = position.coords.latitude ;
        this.lon = position.coords.longitude ;
        const data = await this.service.getCityByCoords( this.lat , this.lon);
        
        // console.log(res) ;
        this.temp = data ;
        let city : string ;
        //console.log(this.temp.address.city);
        city = this.temp.address.city ;
        if ( this.alreadyCityExist(city)) return ;
        if ( city == undefined) return ;
        if ( city.includes(' ')) city = this.temp.address.county ;
        this.getWeather(city) ;
        });
        this.getFavourites();
        
    }
    else {
      console.log('no navigation') ;
    }
  }
  async getWeather(cityName : string , isFav : boolean = false){
    if ( cityName === null) return ;
    this.spinner.show();
    const data = await this.service.getWeatherData(cityName)
    
      this.data = data ;
      console.log(data);
      this.data.isDay = data.dt < data.sys.sunset ;
      this.data.isFav = isFav ;
      this.cityData[`${data.name}`] = this.data ;
      this.spinner.hide();

    
  }

  closeTheCity(name: string) {
    delete this.cityData[`${name}`] ;
  }

  async removeCityFromFavs(name: string) {
    //console.log(this.favCities) ;
      for ( let i = 0 ; i < Object.keys(this.favCities).length; i += 1){
      //this.getWeather(element.city) ;
      let temp : string = this.favCities[i].city ;
      if ( temp === null) continue ;
      if ( temp.toLowerCase() === name.toLowerCase()) {
          let id :number = (this.favCities)[i].id
          const data = await this.service.deleteCityFromRemote(id) ;
          this.cityData[`${name}`].isFav = false ;
          if ( data === "deleted")
          this.toastr.success("Removed from favourites!");
          else this.toastr.error("Sorry some error has occurred refresh the page and try again!");

          this.getFavourites() ;
          console.log(this.favCities) ;
          }
      }
  }
    //this.cityData[`${name}`]
    //delete this.cityData[`${name}`] ;
    //localStorage.setItem('cityData', JSON.stringify(this.cityData)) ;
  

  get cities(): Array<any> {
    if ( this.cityData === undefined || this.cityData === null) return ;
    return Object.keys(this.cityData).map(key => this.cityData[key]) ;
  }

  async addNewCity(cityName:string) {
    console.log(this.favCities)
    if ( this.username == null) {
      this.toastr.error("Cannot add to favourites , Please Log in !");
      return ;
    }
    if (  this.alreadyCityExist(cityName) ) return
      this.favCity.city = cityName ;
      const data =  await this.service.saveFavCityFromRemote(this.favCity)
      console.log(data);  
      this.cityData[`${cityName}`].isFav = true ;
      this.toastr.success("Added to Favourites!");
      this.getFavourites() ;

  }

  async getFavourites() {
    let data ;
  try {
     data = await this.service.getFavouritesFromRemote()
  }
  catch (err) {
    console.log("fav error" ) ;
    return ;
  }
    this.favCities = data ;
  console.log(data.length);
  if ( data.length === 0 && this.already) {
    this.toastr.warning("You don't have any favourites , to favorite one click on the fav icon ");
    this.already = false ;
    return;
  }
  if ( data.length === 0) {
    return ;
  }
  if ( this.favCities != undefined &&(this.favCities)[0].city !== undefined)
  this.favCitiesForDisplay() ;

  

    }
  favCitiesForDisplay(){
    for ( let i = 0 ; i < Object.keys(this.favCities).length; i += 1){
        //this.getWeather(element.city) ;
        this.getWeather((this.favCities)[i].city , true) ;
    };
  }

  getGraph(city :Weatherdata) {
    localStorage.setItem('HistoryCity' , JSON.stringify(city) )
    this.route.navigate(['history']) ;
  }

  alreadyCityExist(city: string): boolean {
    // console.log(Object.keys(this.favCities).length)
    for ( let i = 0 ; i < Object.keys(this.favCities).length; i += 1){
      //this.getWeather(element.city) ;
      // console.log(this.favCities)
      if ( this.favCities == null) return ;
      if ( this.favCities[i].city !== null && city.toLowerCase() === (this.favCities[i].city).toLowerCase())
      {
        console.log(`Already added city ${city}`) ;
        return true ;
      }
    }
  }

  async logOut() {
    console.log("SuccesFully  LoGGed Out" ) ;

    const data = await this.service.logOutUserFromRemote();
    if ( data.slice(0,2) === "OK") {
      console.log("SuccesFully  LoGGed Out"  + data) ;
      
    
      
    }
    else {
      console.log("error");
      console.log(data) ;
    }
  }

  

}





