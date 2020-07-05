import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LandingPageService } from './landing-page.service';


@Component({
  selector: "landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
  providers: [LandingPageService]
})

export class LandingPageComponent implements OnInit {
  weather_data: any;
  constructor(private httpClient: HttpClient, private landingPageService: LandingPageService) {
    this.weather_data = {};
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((responseData) => {
      this.getWeatherData(responseData.coords.latitude, responseData.coords.longitude);
    })
  }

  getWeatherData(lat, lon) {
    this.landingPageService.getWeather(lat, lon).subscribe((responseData) => {
      this.weather_data = responseData;
    })
  }

}