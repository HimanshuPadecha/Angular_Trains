import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Footer } from '../footer/footer';
import { BookingHeader } from '../booking-header/booking-header';
import { TicketDetails } from '../ticket-details/ticket-details';
import { AdditionalServices } from '../additional-services/additional-services';
import { BookingFooter } from '../booking-footer/booking-footer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Booking } from '../../types';

@Component({
  selector: 'app-booking-card',
  imports: [Footer, BookingHeader, TicketDetails, AdditionalServices, BookingFooter, RouterLink],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.css',
})
export class BookingCard implements OnInit {
  id: string | null = null;
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  currentBooking: Booking | undefined;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (isPlatformBrowser(this.platformId)) {
      const { bookings }: { bookings: Booking[] } = history.state;
      this.currentBooking = bookings.find((booking) => booking._id === this.id);
    }
  }
}
