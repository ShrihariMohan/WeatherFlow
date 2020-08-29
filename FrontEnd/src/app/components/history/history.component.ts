import { HistoryData } from '../../POJO/historyData/history-data';
import { Weatherdata } from '../../POJO/weatherData/weatherdata';
import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { WeatherService } from './../../services/weather/weather.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: [ './history.component.css' ]
})
export class HistoryComponent implements OnInit {
	historyCity: Weatherdata;
	hourlyData: any[] = [];
	historyData : any[] = [];
	city: string;
	totalHistoryData = new HistoryData();
	iconLink: string;
	name = 'Angular   6';
	hourlyDisplay: any;
	p: number = 1;
	page = 1;
	pi = 1 ;
	cityName: String;
	iframe = 'anuglar 6'
  	safeSrc: SafeResourceUrl;

	constructor(private service: WeatherService , private sanitizer: DomSanitizer,
		private spinner: NgxSpinnerService) {
			
	}


	ngOnInit(): void {
		this.spinner.show();
 		this.historyCity = JSON.parse(localStorage.getItem('HistoryCity'));
		this.iframe = `https://www.ventusky.com/?p=${this.historyCity.coord.lat};${this.historyCity.coord.lon};2&l=humidity` ;
		this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.ventusky.com/?p=${this.historyCity.coord.lat};${this.historyCity.coord.lon};5&l=pm25`);
		this.getDatas();
		
	}

	getTime(time) {
		let dateConvert = new Date(time * 1000).toString();
		return dateConvert.slice(0, 4) + dateConvert.slice(16, 21);
	}

	getSunTime(time) {
		let dateConvert = new Date(time * 1000).toString();
		return dateConvert.slice(16, 21);
	}

	getTimeDaily(time) {
		let dateConvert = new Date(time * 1000).toString();
		return dateConvert.slice(0, 11);
	}

	async getDatas() {
		let lat = this.historyCity.coord.lat;
		let lon = this.historyCity.coord.lon;
		this.cityName = this.historyCity.name;
		const data = await this.service.getThings(lat, lon);
		this.totalHistoryData = data;
		this.totalHistoryData.weather = data.current.weather[0];
		this.totalHistoryData.hourly = data.hourly;

		this.totalHistoryData.daily = data.daily;
		let dateConvert: string;

		let time: any[] = [],
			hourTemp: any[] = [];

		for (let i = 0; i < this.totalHistoryData.hourly.length; i++) {
			hourTemp.push((this.totalHistoryData.hourly[i]['temp'] - 273.15).toFixed(2));
			dateConvert = new Date(this.totalHistoryData.hourly[i]['dt'] * 1000).toString();
			dateConvert = dateConvert.slice(0, 4) + dateConvert.slice(17, 23);
			time.push(dateConvert);
		}
		this.spinner.hide();
		//console.log(this.totalHistoryData);
		this.getHistory();
	}

	async getHistory() {
		let lat = this.historyCity.coord.lat;
		let lon = this.historyCity.coord.lon;
		for ( let i = 0 ; i < 4 ; i ++) {
		const data = await this.service.getHistory(lat , lon , (this.totalHistoryData.current['dt'])-84000*i);
		this.historyData[i] = data ; 
		}
		console.log(this.historyData) ;

	}

	more() {
		localStorage.setItem('hourly', JSON.stringify(this.totalHistoryData.hourly));
	}

}
