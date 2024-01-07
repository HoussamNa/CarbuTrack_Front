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
  searchtext: any;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  addCar(car: Car) {
    this.carService.addCar(car).subscribe(() => {
      this.loadCars();
      this.clearForm(); // Clear the form after adding a car
    });
  }

  editCar(car: Car) {
    this.carService.updateCar(car).subscribe(
      () => {
        // Optionally perform any additional logic upon successful update
        console.log('Car updated successfully');
        this.loadCars(); // Refresh the car list after the update
      },
      (error) => {
        // Handle errors appropriately, e.g., show error messages
        console.error('Error updating car:', error);
      }
    );
  }
  

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.loadCars();
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

  clearForm() {
    this.newCar = { immatriculation: '', annee: 0, carImage: '' }; // Reset newCar object
  }
}
