import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  hoveredCar: any;

  newCar: Car = { brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' };
  cars: Car[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  editingCar: Car | null = null;
  searchtext: any;

  isCarInfoVisible = false;
  carInfo: any;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.editingCar) {
          this.editingCar.photoU = e.target.result; // Assign base64 data
        } else {
          this.newCar.photoU = e.target.result; // Assign base64 data
        }

        console.log('Image data:', e.target.result); // Log the base64 image data
      };
      reader.readAsDataURL(file);
    }
  }

  addCar() {
    // Create a new Car object with the other fields
    const newCar: Car = {
      brand: this.newCar.brand,
      model: this.newCar.model,
      registrationNumber: this.newCar.registrationNumber,
      fuelType: this.newCar.fuelType,
      photoU: this.newCar.photoU // This should be the base64-encoded image data, not a file input
    };

    console.log('New car data:', newCar); // Log the car data including the image data

    this.carService.addCar(newCar).subscribe(
      (data) => {
        console.log('HTTP Request:', data); // Log the HTTP response
        this.cars.push(data);
        this.newCar = { brand: '', model: '', registrationNumber: '', fuelType: '', photoU: '' };
      },
      (error) => {
        console.error('HTTP Error:', error); // Log any HTTP errors
      }
    );
  }

  editCar(car: Car) {
    this.editingCar = { ...car };
  }

  updateCar() {
    if (this.editingCar) {
      console.log('Updating car:', this.editingCar); // Log the editingCar object before the update
      this.carService.updateCar(this.editingCar).subscribe(
        (updatedCar) => {
          console.log('Updated car:', updatedCar); // Log the updated car data
          this.getCars();
          this.editingCar = null;
        },
        (error) => {
          console.error('HTTP Error:', error); // Log any HTTP errors
        }
      );
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

  // Method to cancel the edit and go back to add form
  cancelEdit() {
    this.editingCar = null;
  }
}
