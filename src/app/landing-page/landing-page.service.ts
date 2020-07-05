import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()

export class LandingPageService {
  constructor(private httpClient: HttpClient) {

  }

  getWeather(lat, lon) {
    return this.httpClient.get('https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon)
  }
}