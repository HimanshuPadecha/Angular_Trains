import { Injectable, signal } from '@angular/core';
import { Class, Passenger, SearchTrainsParams, Train } from '../types';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private train = signal<Train | null>(null);
  private trainClass = signal<Class | null>(null);

  private passengers = signal<Passenger[] | null>(null);
  private email = signal('');
  private phone = signal('');
  private base = signal(0);
  private additional = signal(0);
  private insurance = signal(0);
  private searchParams = signal<SearchTrainsParams | null>(null);

  // Train route
  addTrain(train: Train): void {
    this.train.set(train);
  }

  addSearchParams(params: SearchTrainsParams) {
    this.searchParams.set(params);
  }

  addTrainClass(classObj: Class): void {
    this.trainClass.set(classObj);
  }

  getTrainInfo(): {
    train: Train | null;
    selectedClass: Class | null;
    searchParams: SearchTrainsParams | null;
  } {
    return {
      train: this.train(),
      selectedClass: this.trainClass(),
      searchParams: this.searchParams(),
    };
  }

  containsTrainInfo(): boolean {
    return this.train() !== null && this.trainClass() !== null;
  }

  // fare route
  addPassengers(passengers: Passenger[]) {
    this.passengers.set(passengers);
  }

  addEmail(email: string) {
    this.email.set(email);
  }

  addPhone(phone: string) {
    this.phone.set(phone);
  }

  addBase(amount: number) {
    this.base.set(amount);
  }

  addAdditional(amount: number) {
    this.additional.set(amount);
  }

  addInsureance(amount: number) {
    this.insurance.set(amount);
  }

  contrainsFareInfo() {
    return (
      this.passengers() !== null &&
      this.email() !== null &&
      this.phone() !== null &&
      this.base() !== 0 &&
      this.additional() !== 0
    );
  }

  getFareRouteInfo() {
    return {
      passengers: this.passengers(),
      email: this.email(),
      phone: this.phone(),
      base: this.base(),
      additional: this.additional(),
      insureance: this.insurance(),
    };
  }
}
