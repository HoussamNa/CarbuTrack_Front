import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Car {
  immatriculation: string;
  annee: number;
  carImage: string; // Assumes this will be a data URL or path to the image
}


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [];

  getCars(): Observable<Car[]> {
    return of(this.cars);
  }

  addCar(car: Car): Observable<void> {
    this.cars.push(car);
    return of(void 0);
  }

  updateCar(updatedCar: Car): Observable<void> {
    const index = this.cars.findIndex(car => car.immatriculation === updatedCar.immatriculation);
    if (index !== -1) {
      this.cars[index] = updatedCar;
    }
    return of(void 0);
  }

  deleteCar(car: Car): Observable<void> {
    const index = this.cars.findIndex(c => c === car);
    if (index > -1) {
      this.cars.splice(index, 1);
    }
    return of(void 0);
  }
}
