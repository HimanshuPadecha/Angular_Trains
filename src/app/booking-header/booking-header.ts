import { Component, input } from '@angular/core';
import { Booking } from '../../types';

@Component({
  selector: 'app-booking-header',
  imports: [],
  templateUrl: './booking-header.html',
  styleUrl: './booking-header.css',
})
export class BookingHeader {
  currentBooking = input.required<Booking>()
}
