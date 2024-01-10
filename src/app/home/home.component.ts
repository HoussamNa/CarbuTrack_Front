import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gasolinePrice: string = '';
  dieselPrice: string = '';
  currency: string = '';
  date: string = '';
  userLatitude: number = 0;
  userLongitude: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;

          const headers = new HttpHeaders({
            Authorization: 'apikey 4q4TY2g1CqB3xDBUvQHnLr:0VeN67tVcoXWFf9w6EaQ1w',
            'Content-Type': 'application/json',
          });

          this.http
            .get<any>(
              `https://api.collectapi.com/gasPrice/fromCoordinates?lng=${this.userLongitude},${this.userLatitude}`,
              { headers: headers }
            )
            .subscribe(
              (data) => {
                if (data.success) {
                  this.gasolinePrice = data.result.gasoline;
                  this.dieselPrice = data.result.diesel;
                  this.currency = data.result.currency;
                  this.date = data.result.date;
                } else {
                  console.error('Failed to fetch gas price data');
                }
              },
              (error) => {
                console.error('Error while fetching data:', error);
              }
            );
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }
}
