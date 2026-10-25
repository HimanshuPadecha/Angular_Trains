import { Injectable, signal } from '@angular/core';
import { Class, Passenger, Train } from '../types';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private train = signal<Train | null>(null);
  private trainClass = signal<Class | null>(null);

  private passengers = signal<Passenger[] | null>(null);
  private email = signal('');
  private phone = signal('');
  private total = signal(0);

  // Train route
  addTrain(train: Train): void {
    this.train.set(train);
  }

  addTrainClass(classObj: Class): void {
    this.trainClass.set(classObj);
  }

  getTrainInfo(): { train: Train | null; selectedClass: Class | null } {
    return { train: this.train(), selectedClass: this.trainClass() };
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

  addTotal(amount: number) {
    this.total.set(amount);
  }

  getFareRouteInfo() {
    return {
      passengers: this.passengers(),
      email: this.email(),
      phone: this.phone(),
      total: this.total(),
    };
  }
}
