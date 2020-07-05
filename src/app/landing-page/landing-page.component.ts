import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LandingPageService } from './landing-page.service';


@Component({
  selector: "landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
  providers: [LandingPageService],
  encapsulation: ViewEncapsulation.None

})

export class LandingPageComponent implements OnInit {
  weather_data: any;
  loader: boolean;
  current_temp = {
    temp: null,
    format: "C"
  };
  time = {
    sunrise: null,
    sunset: null
  }
  constructor(private httpClient: HttpClient, private landingPageService: LandingPageService) {
    this.weather_data = {};
    this.loader = true;

  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((responseData) => {
      this.getWeatherData(responseData.coords.latitude, responseData.coords.longitude);
    })
  }

  changeFormat() {
    if (this.current_temp.format === 'C') {
      this.current_temp.temp = Math.round(this.weather_data.main.temp * (9 / 5) + 32);
      this.current_temp.format = 'F';
    }
    else if (this.current_temp.format === 'F') {
      this.current_temp.temp = this.weather_data.main.temp;
      this.current_temp.format = 'C';
    }
  }

  getWeatherData(lat, lon) {
    this.landingPageService.getWeather(lat, lon).subscribe((responseData) => {
      this.loader = false;
      this.weather_data = responseData;
      this.current_temp.temp = this.weather_data.main.temp;
      // this.time.sunrise = this.getReadableDate(this.weather_data.sys.sunrise)

    })
  }

  // getReadableDate(currMill) {
  //   let date = new Date(currMill);
  //   console.log(date.toTimeString())
  //   return (date.toString())
  // }



}