import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Chart data
  lineChartData = [
    {
      name: 'Series 1',
      series: [
        { name: 'Jan', value: 20 },
        { name: 'Feb', value: 30 },
      ],
    },
  ];

  barChartData = [
    {
      name: 'Category 1',
      series: [
        { name: 'Jan', value: 10 },
        { name: 'Feb', value: 25 },
      ],
    },
  ];

  pieChartData = [
    { name: 'A', value: 30 },
    { name: 'B', value: 20 },
  ];

  // Consumption data for the table
  consumptionData = [
    { category: 'Gasoline', value: 50 },
    { category: 'Diesel', value: 30 },
  ];

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#FFFFFF'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  gradient = false;
}