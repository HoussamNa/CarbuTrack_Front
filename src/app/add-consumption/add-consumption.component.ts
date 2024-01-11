import { Component, OnInit } from '@angular/core';
import { ConsumptionService, Consumption } from '../consumption.service';

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.scss']
})
export class AddConsumptionComponent implements OnInit {
    newConsumption: any = {
        car: null, // Initialize the car property to null or a default value
        quantity: null,
        cost: null,
        date: null
      };
    cars: any[] = [  // Replace 'any[]' with the actual type of your 'cars' array
    { id: 1, brand: 'Brand 1', model: 'Model 1' },
    { id: 2, brand: 'Brand 2', model: 'Model 2' },
    // Add more car objects as needed
  ];
    
    consumptions: Consumption[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 10;
    editedConsumption: Consumption = { quantity: 0, cost: 0, date: '' };
    showEditForm: boolean = false;

    constructor(private consumptionService: ConsumptionService) {}

    ngOnInit() {
        this.getConsumptions();
    }

    getConsumptions() {
        this.consumptionService.getConsumptions().subscribe((data) => {
            this.consumptions = data;
        });
    }

    addConsumption(consumption: Consumption) {
        this.consumptionService.addConsumption(consumption).subscribe(() => {
            this.getConsumptions();
            this.newConsumption = { quantity: 0, cost: 0, date: '' };
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
}
