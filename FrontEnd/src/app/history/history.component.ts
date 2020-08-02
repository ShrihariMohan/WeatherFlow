import { HistoryData } from './../history-data';
import { RegistrationService } from './../registration.service';
import { Weatherdata } from './../weatherdata';
import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: [ './history.component.css' ]
})
export class HistoryComponent implements OnInit {
	historyCity: Weatherdata;
	hourlyData: any[] = [];
	city: string;
	totalHistoryData = new HistoryData();
	iconLink: string;
	name = 'Angular   6';
	canvas: any;
	ctx: any;
	hourlyDisplay: any;
	p: number = 1;
	page = 1;
	cityName: String;
	iframe = 'anuglar 6'
  safeSrc: SafeResourceUrl;

	constructor(private service: RegistrationService , private sanitizer: DomSanitizer,
		private spinner: NgxSpinnerService) {
			
	}


	ngOnInit(): void {
		this.spinner.show();
 
			
		this.historyCity = JSON.parse(localStorage.getItem('HistoryCity'));
		this.iframe = `https://www.ventusky.com/?p=${this.historyCity.coord.lat};${this.historyCity.coord.lon};2&l=humidity` ;
		console.log(this.iframe)
		this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.ventusky.com/?p=${this.historyCity.coord.lat};${this.historyCity.coord.lon};5&l=pm25`);
		this.getDatas();
		
	}

	getTime(time) {
		let dateConvert = new Date(time * 1000).toString();
		//console.log(dateConvert)
		dateConvert = dateConvert.slice(0, 4) + dateConvert.slice(17, 23);
		return dateConvert;
	}

	getTimeDaily(time) {
		let dateConvert = new Date(time * 1000).toString();
		dateConvert = dateConvert.slice(0, 11);
		return dateConvert;
	}

	async getDatas() {
		let lat = this.historyCity.coord.lat;
		let lon = this.historyCity.coord.lon;
		this.cityName = this.historyCity.name;
		const data = await this.service.getThings(lat, lon);
		//console.log(data);
		this.totalHistoryData = data;
		this.totalHistoryData.weather = data.current.weather[0];
		//console.log(this.totalHistoryData) ;
		this.totalHistoryData.hourly = data.hourly;

		this.totalHistoryData.daily = data.daily;
		console.log(this.historyCity);
		let dateConvert: string;

		let time: any[] = [],
			hourTemp: any[] = [];

		for (let i = 0; i < this.totalHistoryData.hourly.length; i++) {
			hourTemp.push((this.totalHistoryData.hourly[i]['temp'] - 273.15).toFixed(2));
			dateConvert = new Date(this.totalHistoryData.hourly[i]['dt'] * 1000).toString();
			//console.log(dateConvert)
			dateConvert = dateConvert.slice(0, 4) + dateConvert.slice(17, 23);
			time.push(dateConvert);
		}
		
			this.spinner.hide();
		 

		//  this.getGraph(time , hourTemp) ;
	}

	more() {
		localStorage.setItem('hourly', JSON.stringify(this.totalHistoryData.hourly));
		console.log('MORE', this.totalHistoryData.hourly);
	}


}
