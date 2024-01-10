import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  newCar: Car = { brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' };
  cars: Car[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  editingCar: Car | null = null;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  addCar() {
    this.carService.addCar(this.newCar).subscribe((data) => {
      this.cars.push(data);
      this.newCar = { brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' };
    });
  }

  editCar(car: Car) {
    this.editingCar = { ...car };
  }

  updateCar() {
    if (this.editingCar) {
      this.carService.updateCar(this.editingCar).subscribe(() => {
        this.getCars();
        this.editingCar = null;
      });
    }
  }

  deleteCar(id: number | undefined) {
    if (id !== undefined) {
      this.carService.deleteCar(id).subscribe(() => {
        this.getCars();
      });
    }
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
        if (this.editingCar) {
          this.editingCar.photoU = e.target.result;
        } else {
          this.newCar.photoU = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
