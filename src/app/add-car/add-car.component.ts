import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  newCar: Car = { immatriculation: '', annee: 0, carImage: '' };
  cars: Car[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  addCar(car: Car) {
    this.carService.addCar(car).subscribe(() => {
      this.getCars();
    });
  }

  editCar(car: Car) {
    // Logic to edit a car
    // You'll need to fill in this method based on how you want to handle editing.
  }

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil(this.cars.length / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newCar.carImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
