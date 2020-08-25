import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FavCity } from './../../POJO/favCity/fav-city';
import { CityWeatherData } from './../../POJO/CityWeatherData/city-weather-data';
import { Weatherdata } from './../../POJO/weatherData/weatherdata';
import { RegistrationService } from './../../services/registration/registration.service';
import { WeatherService } from './../../services/weather/weather.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})

export class WeatherHomeComponent implements OnInit {

  data = new Weatherdata();
  temp: any;
  cityData = new CityWeatherData();
  dataKeys: Object = Object.keys(this.cityData);
  lat: number;
  lon: number;
  username: string = null;
  favCity = new FavCity();
  favCities = {};
  favCityNames: any;
  history = [];
  historyTemp: any[] = []
  historyDay: any[] = []
  hourlyData: any[];
  already: boolean = true;


  constructor(private service: RegistrationService,
    private route: Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService , 
    private weatherService : WeatherService) {
  }

  async ngOnInit() {
    this.getLocation();
    try {
      this.username = await this.service.getUserFromRemote();
      if ( this.username == "false") return ;
      this.username = (this.username).slice(0, 1).toUpperCase() + this.username.slice(1);
    }
    catch (err) {
      return;
    }
    this.getFavourites();
  }

  async getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        const data = await this.weatherService.getCityByCoords(this.lat, this.lon);
        this.temp = data;
        let city: string;

        city = this.temp.address.city;
        if (this.alreadyCityExist(city)) return;
        if (city == undefined) return;
        if (city.includes(' ')) city = this.temp.address.county;
        this.getWeather(city);
      },
        error => {
          this.spinner.hide();
          switch (error.code) {
            case 1:
              this.toastr.warning('Location permission denied ');
              break;
            case 2:
              this.toastr.warning('Position Unavailable');
              break;
            case 3:
              this.toastr.warning('Timeout');
              break;
          }
        });
      this.getFavourites();

    }
 }

  async getWeather(cityName: string, isFav: boolean = false) {
    if (cityName === null) return;
    this.spinner.show();
    try {
    const data = await this.weatherService.getWeatherData(cityName);
    this.data = data ;
    console.log(data) ;
    this.data.isDay = data.dt < data.sys.sunset;
    this.data.isFav = isFav;
    this.cityData[`${data.name}`] = this.data;
    this.spinner.hide();
  }
    catch ( err) {
      this.spinner.hide();
      return ;
    }
  }

  closeTheCity(name: string) {
    delete this.cityData[`${name}`];
  }

  async removeCityFromFavs(name: string) {
    for (let i = 0; i < Object.keys(this.favCities).length; i += 1) {
      let temp: string = this.favCities[i].city;
      if (temp === null) continue;
      if (temp.toLowerCase() === name.toLowerCase()) {
        let id: number = (this.favCities)[i].id
        const data = await this.service.deleteCityFromRemote(id);
        this.cityData[`${name}`].isFav = false;
        if (data === "deleted") this.toastr.success("Removed from favourites!");
        else this.toastr.error("Sorry some error has occurred refresh the page and try again!");

        this.getFavourites();
        console.log(this.favCities);
      }
    }
  }

  get cities(): Array<any> {
    if (this.cityData === undefined || this.cityData === null) return;
    return Object.keys(this.cityData).map(key => this.cityData[key]);
  }

  async addNewCity(cityName: string) {
    console.log(this.favCities)
    if (this.username == null) {
      this.toastr.error("Cannot add to favourites , Please Log in !");
      return;
    }
    if (this.alreadyCityExist(cityName)) return;
    this.favCity.city = cityName;
    const data = await this.service.saveFavCityFromRemote(this.favCity)
    console.log(data);
    this.cityData[`${cityName}`].isFav = true;
    this.toastr.success("Added to Favourites!");
    this.getFavourites();
}

  async getFavourites() {
    let data;
    if ( this.username == "false") return;
    try {
      data = await this.service.getFavouritesFromRemote()
    }
    catch (err) {
      return;
    }
    this.favCities = data;
    if (data.length === 0 || this.already) {
      this.already = false;
      return;
    }
    if (this.favCities != undefined && (this.favCities)[0].city !== undefined) this.favCitiesForDisplay();

  }

  favCitiesForDisplay() {
    for (let i = 0; i < Object.keys(this.favCities).length; i += 1) {
      this.getWeather((this.favCities)[i].city, true);
    };
  }

  getGraph(city: Weatherdata) {
    localStorage.setItem('HistoryCity', JSON.stringify(city))
    this.route.navigate(['history']);
  }

  alreadyCityExist(city: string): boolean {
    for (let i = 0; i < Object.keys(this.favCities).length; i += 1) {
      if (this.favCities == null) return;
      if (this.favCities[i].city !== null && city.toLowerCase() === (this.favCities[i].city).toLowerCase()) {
        console.log(`Already added city ${city}`);
        return true;
      }
    }
  }

  async logOut() {
    const data = await this.service.logOutUserFromRemote();
    if (data.slice(0, 2) === "OK") this.route.navigate['home'] ;
    else this.toastr.warning('Something Happened ! Try again Later');
  }

}





