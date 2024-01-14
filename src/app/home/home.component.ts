import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gasolinePrice: string = ''; // Gasoline price in MAD
  dieselPrice: string = '';   // Diesel price in MAD
  currency: string = '';
  date: string = '';
  userLatitude: number = 0;
  userLongitude: number = 0;
  fuelCostForm: FormGroup = new FormGroup({});
  fuelCostResult: string = '';
  todayWeather: any; // Store today's weather data

  // Exchange rate from original currency to MAD
  exchangeRateToMAD: number = 9.96; // Replace with the actual exchange rate

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;

          const headers = new HttpHeaders({
            Authorization: 'apikey 3nL26O9Vl979nH8ZjEGXZu:1TP9LHzTLdjOkfHqGue4VC',
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
                  // Convert gasoline and diesel prices to MAD
                  this.gasolinePrice = (parseFloat(data.result.gasoline) * this.exchangeRateToMAD + 3).toFixed(2);
                  this.dieselPrice = (parseFloat(data.result.diesel) * this.exchangeRateToMAD + 3).toFixed(2);
                  this.currency = 'MAD'; // Currency is MAD
                  this.date = data.result.date;
                } else {
                  console.error('Failed to fetch gas price data');
                }
              },
              (error) => {
                console.error('Error while fetching data:', error);
              }
            );

            // Fetch today's weather data
            this.http
              .get<any>(
                `https://api.collectapi.com/weather/getWeather?data.lang=en&data.city=marrakech`,
                { headers: headers }
              )
              .subscribe(
                (data) => {
                  if (data.result && data.result.length > 0) {
                    this.todayWeather = data.result[0];
                  } else {
                    console.error('Failed to fetch today\'s weather data');
                  }
                },
                (error) => {
                  console.error('Error while fetching weather data:', error);
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

    // Initialize the fuelCostForm
    this.fuelCostForm = this.fb.group({
      fuelType: ['gasoline', [Validators.required]],
      fuelEfficiency: ['', [Validators.required, Validators.min(0)]],
      tripDistance: ['', [Validators.required, Validators.min(0)]],
    });
  }

  calculateFuelCost() {
    if (this.fuelCostForm.valid) {
      const fuelEfficiency = parseFloat(this.fuelCostForm.get('fuelEfficiency')!.value);
      const tripDistance = parseFloat(this.fuelCostForm.get('tripDistance')!.value);

      if (!isNaN(fuelEfficiency) && !isNaN(tripDistance)) {
        // Get the selected fuel type from the form
        const selectedFuelType = this.fuelCostForm.get('fuelType')!.value;

        // Get the corresponding fuel price based on the selected type
        const fuelPrice = selectedFuelType === 'gasoline' ? parseFloat(this.gasolinePrice) : parseFloat(this.dieselPrice);

        // Calculate the fuel cost in MAD
        const fuelCost = (tripDistance / fuelEfficiency) * fuelPrice;
        this.fuelCostResult = `Estimated Fuel Cost: MAD ${fuelCost.toFixed(2)}`;
      } else {
        console.error('Invalid input values for fuel efficiency or trip distance.');
        this.fuelCostResult = 'Invalid input values';
      }
    }
  }
}
