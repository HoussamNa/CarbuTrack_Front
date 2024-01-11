import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from './car.service'

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private apiUrl = 'http://localhost:8088/api/consumption'; // Update with your consumption microservice API URL

  constructor(private http: HttpClient) {}

  getConsumptions(): Observable<Consumption[]> {
    return this.http.get<Consumption[]>(this.apiUrl);
  }

  addConsumption(consumption: Consumption): Observable<void> {
    return this.http.post<void>(this.apiUrl, consumption);
  }

  updateConsumption(consumption: Consumption): Observable<void> {
    const url = `${this.apiUrl}/${consumption.id}`;
    return this.http.put<void>(url, consumption);
  }

  deleteConsumption(consumption: Consumption): Observable<void> {
    const url = `${this.apiUrl}/${consumption.id}`;
    return this.http.delete<void>(url);
  }
  getCarsForClient(clientId: number): Observable<Car[]> {
    const url = `${this.apiUrl}/client/${clientId}`; // Modify the URL to match your API endpoint
    return this.http.get<Car[]>(url);
  }
  


  
}
// consumption.model.ts (You can name it as per your project structure)
export interface Consumption {
    id?: number; // Optional if you have an ID field
    car: Car; // Assuming 'Car' is another custom type
    quantity: number;
    cost: number;
    date: string; // You can use the 'Date' type if needed
  }

