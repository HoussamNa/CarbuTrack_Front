import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
    private consumptions: Consumption[] = [];

    getConsumptions(): Observable<Consumption[]> {
        return of(this.consumptions);
    }

    addConsumption(consumption: Consumption): Observable<void> {
        this.consumptions.push(consumption);
        return of(void 0);
    }

    updateConsumption(consumption: Consumption): Observable<void> {
        const index = this.consumptions.findIndex(c => c === consumption);
        if (index !== -1) {
            this.consumptions[index] = { ...consumption };
        }
        return of(void 0);
    }

    deleteConsumption(consumption: Consumption): Observable<void> {
        const index = this.consumptions.findIndex(c => c === consumption);
        if (index !== -1) {
            this.consumptions.splice(index, 1);
        }
        return of(void 0);
    }
}

export interface Consumption {
    quantity: number;
    cost: number;
    date: string;
}
