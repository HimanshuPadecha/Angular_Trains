import { Component, computed, inject, input } from '@angular/core';
import { Class, Passenger } from '../../types';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fare-summary',
  imports: [],
  templateUrl: './fare-summary.html',
  styleUrl: './fare-summary.css',
})
export class FareSummary {
  selectedClass = input.required<Class>();
  passengers = input.required<Passenger[]>();
  hasInsurence = input.required<boolean>();
  email = input.required<string>();
  phone = input.required<string>();

  private toaster = inject(ToastrService);
  private booking = inject(BookingService);
  private router = inject(Router);

  baseFare = computed(() => {
    let count = this.getPassengerCount();
    const base = this.selectedClass().fare * count;

    return base;
  });

  getPassengerCount(): number {
    let count = 0;

    this.passengers().forEach((passenger) => {
      if (passenger.name !== '' && passenger.age > 10) {
        count++;
      }
    });

    return count;
  }

  superfastCharge = computed(() => (this.getPassengerCount() > 0 ? 45 : 0));
  reservationCharge = computed(() => (this.getPassengerCount() > 0 ? 60 : 0));

  insurenceAmount = computed(() => {
    return this.hasInsurence() ? 0.35 * this.getPassengerCount() : 0;
  });

  gstAmount = computed(() => {
    const gst =
      ((this.baseFare() +
        this.superfastCharge() +
        this.reservationCharge() +
        this.insurenceAmount()) *
        5) /
      100;

    return Math.round(gst);
  });

  grandTotal = computed(() => {
    return (
      this.baseFare() +
      this.superfastCharge() +
      this.reservationCharge() +
      this.insurenceAmount() +
      this.gstAmount()
    );
  });

  handleProceedToPayment() {
    const finalPassengers = this.passengers().filter(
      (passenger) => passenger.name !== '' && passenger.age > 0,
    );

    if(finalPassengers.length === 0){
      this.toaster.error("Cannot proceed with no clients !!!")
      return
    }

    if (!this.email() || !this.phone()) {
      this.toaster.error('Please enter email and phone numbers to proceed !!');
      return;
    }

    this.booking.addEmail(this.email());
    this.booking.addPhone(this.phone());
    this.booking.addPassengers(finalPassengers);
    this.booking.addTotal(this.grandTotal());

    console.log(this.booking.getFareRouteInfo());

    // redirect to the /payment route 
    // this.router.navigate(['/payment'])
  }
}
