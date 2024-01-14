import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarService } from '../car.service'; // Import your CarService

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
    data: any;
    options: any;

    constructor(private carService: CarService) {} // Inject the CarService

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        // Fetch the user's car data from your service
        this.carService.getCars().subscribe((userCars: any[]) => {
            // Calculate the number of gasoline and diesel cars
            const numGasolineCars = userCars.filter(car => car.fuelType === 'Gasoline').length;
            const numDieselCars = userCars.filter(car => car.fuelType === 'Diesel').length;

            this.data = {
                labels: ['Gasoline', 'Diesel'],
                datasets: [
                    {
                        data: [numGasolineCars, numDieselCars],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--yellow-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400'),
                            documentStyle.getPropertyValue('--yellow-400')
                        ]
                    }
                ]
            };
        });

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
