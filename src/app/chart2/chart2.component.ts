import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarService, Car } from '../car.service'; // Import your CarService and Car interface

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
  data: any;
  options: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private carService: CarService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      // Fetch historical data for gasoline and diesel cars
      this.carService.getCars().subscribe((cars: Car[]) => {
        // Extract and process data for the chart
        const gasolineData: number[] = [];
        const dieselData: number[] = [];
        const labels: string[] = [];

        cars.forEach((car: Car) => {
          labels.push(car.registrationNumber); // Use registration numbers as labels or customize as needed
          gasolineData.push(car.fuelType === 'Gasoline' ? 1 : 0);
          dieselData.push(car.fuelType === 'Diesel' ? 1 : 0);
        });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Gasoline',
              data: gasolineData,
              fill: false,
              borderColor: '#4CAF50',
              tension: 0.4
            },
            {
              label: 'Diesel',
              data: dieselData,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
            }
          ]
        };
      });

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }
  }
}
