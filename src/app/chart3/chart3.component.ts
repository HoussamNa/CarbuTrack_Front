import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../car.service'; // Import your CarService

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit {
  data: any;
  options: any;

  constructor(private carService: CarService) {}

  ngOnInit() {
    // Fetch car data from the CarService
    this.carService.getCars().subscribe((cars: Car[]) => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      // Extract meaningful statistics from car data
      const brands = cars.map(car => car.brand);
      const fuelTypes = cars.map(car => car.fuelType);
      const uniqueBrands = [...new Set(brands)]; // Get unique brand names
      const brandCounts = uniqueBrands.map(brand => brands.filter(b => b === brand).length); // Count cars per brand
      const uniqueFuelTypes = [...new Set(fuelTypes)]; // Get unique fuel types
      const fuelTypeCounts = uniqueFuelTypes.map(fuelType => fuelTypes.filter(f => f === fuelType).length); // Count cars per fuel type

      this.data = {
        labels: uniqueBrands, // Display brands on the X-axis
        datasets: [
          {
            label: 'Number of Cars per Brand',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: brandCounts
          },
          {
            label: 'Number of Cars per Fuel Type',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: fuelTypeCounts
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
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
              color: textColorSecondary,
              font: {
                weight: 500
              }
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
    });
  }
}
