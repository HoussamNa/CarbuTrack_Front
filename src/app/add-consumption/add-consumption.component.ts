import { Component, OnInit } from '@angular/core';
import { ConsumptionService, Consumption } from '../consumption.service';

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.scss']
})
export class AddConsumptionComponent implements OnInit {
    newConsumption: Consumption = { quantity: 0, cost: 0, date: '' };
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
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Car {
//   immatriculation: string;
//   annee: number;
//   carImage: string;
// }

// @Component({
//   selector: 'app-add-car',
//   templateUrl: './add-car.component.html',
//   styleUrls: ['./add-car.component.scss']
// })
// export class AddCarComponent implements OnInit {
//   newCar: Car = { immatriculation: '', annee: 0, carImage: '' };
//   cars: Car[] = [];
//   searchtext: any;
//   currentPage = 1;
//   itemsPerPage = 5;

//   private baseUrl = 'http://localhost:8089/api/car';

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadCars();
//   }

//   loadCars() {
//     this.http.get<Car[]>(this.baseUrl).subscribe(cars => {
//       this.cars = cars;
//     });
//   }

//   addCar(car: Car) {
//     this.http.post<Car>(this.baseUrl, car).subscribe(() => {
//       this.loadCars();
//       this.clearForm();
//     });
//   }

//   editCar(car: Car) {
//     const editUrl = `${this.baseUrl}/${car.immatriculation}`;
//     this.http.put<Car>(editUrl, car).subscribe(() => {
//       this.loadCars();
//     });
//   }

//   deleteCar(car: Car) {
//     const deleteUrl = `${this.baseUrl}/${car.immatriculation}`;
//     this.http.delete<void>(deleteUrl).subscribe(() => {
//       this.loadCars();
//     });
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//   }

//   getPaginationArray(): number[] {
//     const pageCount = Math.ceil(this.cars.length / this.itemsPerPage);
//     return new Array(pageCount).fill(0).map((_, index) => index + 1);
//   }

//   handleFileInput(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newCar.carImage = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   clearForm() {
//     this.newCar = { immatriculation: '', annee: 0, carImage: '' };
//   }
// }
