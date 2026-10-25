import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../booking';
import { FareSummary } from '../fare-summary/fare-summary';
import { FooterDisclaimer } from '../footer-disclaimer/footer-disclaimer';
import { PassagerForms } from '../passenger-forms/passenger-forms';
import { TraininfoBanner } from '../traininfo-banner/traininfo-banner';
import { Passenger } from '../../types';

@Component({
  selector: 'app-passenger-fare',
  imports: [TraininfoBanner, PassagerForms, FareSummary, FooterDisclaimer],
  templateUrl: './passenger-fare.html',
  styleUrl: './passenger-fare.css',
})
export class PassengerFare {
  bookingService = inject(BookingService);

  constructor() {
    this.passengers.set([{ name: '', age: 0, gender: 'male', pref: null, id: Date.now() }]);
  }

  passengers = signal<Passenger[]>([]);
  phone = signal<string>('');
  email = signal('');
  insureance = signal(false);

  setPassengers(passengers: Passenger[]) {
    this.passengers.set(passengers);
  }
}
