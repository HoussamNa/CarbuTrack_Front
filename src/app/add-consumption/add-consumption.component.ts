import { Component, OnInit } from '@angular/core';
import { ConsumptionService, Consumption } from '../consumption.service';
import { Car } from '../car.service';

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.scss']
})
export class AddConsumptionComponent implements OnInit {
  newConsumption: Consumption = {
    car: { id: 0, brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' },
    quantity: 0,
    cost: 0,
    date: ''
  };
  cars: Car[] = [];
  consumptions: Consumption[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  editedConsumption: Consumption = {
    car: { id: 0, brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' },
    quantity: 0,
    cost: 0,
    date: ''
  };
  showEditForm: boolean = false;

  constructor(private consumptionService: ConsumptionService) {}

  ngOnInit() {
    this.getConsumptions();
    this.getCars();
  }

  getConsumptions() {
    this.consumptionService.getConsumptions().subscribe((data) => {
      this.consumptions = data;
    });
  }

  addConsumption(consumption: Consumption) {
    this.consumptionService.addConsumption(consumption).subscribe(() => {
      this.getConsumptions();
      this.newConsumption = {
        car: { id: 0, brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' },
        quantity: 0,
        cost: 0,
        date: ''
      };
    });
  }

  editConsumption(consumption: Consumption) {
    this.editedConsumption = { ...consumption };
    this.showEditForm = true;
  }

  updateConsumption() {
    this.consumptionService.updateConsumption(this.editedConsumption).subscribe(() => {
      this.showEditForm = false;
      this.getConsumptions();
    });
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.consumptions.length / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  deleteConsumption(consumption: Consumption) {
    const confirmDelete = confirm('Are you sure you want to delete this consumption?');
    if (confirmDelete) {
      this.consumptionService.deleteConsumption(consumption).subscribe(() => {
        this.getConsumptions();
      });
    }
  }

  getCars() {
    // Load the list of cars from your CarService here
  }
}
