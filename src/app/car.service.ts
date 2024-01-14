import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8089/api/car';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getCars(): Observable<Car[]> {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      const url = `${this.apiUrl}?clientId=${currentUser.id}`;
      return this.http.get<Car[]>(url);
    }
    return this.http.get<Car[]>(this.apiUrl);
  }
  
  addCar(car: Car): Observable<Car> {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      car.clientId = currentUser.id; // Set the clientId from the logged-in user
    }
    return this.http.post<Car>(this.apiUrl, car);
  }
  

  updateCar(car: Car): Observable<Car> {
    const url = `${this.apiUrl}/${car.id}`;
    return this.http.put<Car>(url, car);
  }

  deleteCar(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

export interface Car {
  id?: number;
  brand: string;
  model: string;
  registrationNumber: string;
  fuelType: string;
  photoU: string;
  clientId?: number;
}
