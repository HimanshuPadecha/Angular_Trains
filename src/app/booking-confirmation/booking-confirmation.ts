import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingFooter } from '../booking-footer/booking-footer';
import { Footer } from '../footer/footer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { baseUrl } from '../url';
import { Booking, Error, Response } from '../../types';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  imports: [Footer, RouterLink],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})
export class BookingConfirmation implements OnInit {
  private http = inject(HttpClient);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  bookings = signal<Booking[] | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.http.get<Response<Booking[]>>(`${baseUrl}/bookings/my-bookings`).subscribe({
      next: (response) => {
        this.loading.set(false);
        console.log(response);

        this.bookings.set(response.response.data);
        this.toaster.success('Bookings fetched successfully !! ');
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        console.log(error);

        const backendError = error.error as Error;

        this.toaster.error(backendError.message);
      },
    });
  }

  navigateToCard(id: string) {
    
    this.router.navigate(['/booking-confirmation/' + id], {
      state: {
        bookings: this.bookings(),
      },
    });
  }
}
