import { Component, inject } from '@angular/core';
import { BookingService } from '../booking';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../url';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-summary',
  imports: [],
  templateUrl: './journey-summary.html',
  styleUrl: './journey-summary.css',
})
export class JourneySummary {
  booking = inject(BookingService);

  private http = inject(HttpClient);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  handleBooking() {
    // TrainId, sourceStation : string, destinationstation : string, className : string, passengers[], email : string, phone: string, fareBreakdown

    const { passengers, additional, base, email, insureance, phone } =
      this.booking.getFareRouteInfo();
    const { selectedClass, train, searchParams } = this.booking.getTrainInfo();

    const requestPayload = {
      train: train?._id,
      sourceStation: searchParams?.source,
      destinationStation: searchParams?.destination,
      className: selectedClass?.className,
      passengers: passengers?.map((passenger) => ({
        fullName: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
        status: 'WL',
      })),
      contactEmail: email,
      contactPhone: phone,
      fareBreakdown: {
        baseFare: base,
        superfastCharge: additional,
        reservationCharge: 0,
        insurance: insureance,
        gst: 0,
        totalAmount: base + additional + insureance,
      },
    };

    this.http.post(`${baseUrl}/bookings`, requestPayload).subscribe({
      next: (response) => {
        console.log(response);
        this.toaster.success('The train is booked successfully');
        this.router.navigate(['booking-confirmation']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
