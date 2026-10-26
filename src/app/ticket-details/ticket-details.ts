import { Component, inject, input } from '@angular/core';
import { Booking } from '../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-details',
  imports: [],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css',
})
export class TicketDetails {
  currentBooking = input.required<Booking>();
  private toaster = inject(ToastrService);

  handlePrint() {
    setTimeout(() => {
      window.print();
    }, 500);
  }

  handleDownloadPDF() {
    setTimeout(() => {
      window.print();
    }, 1000);
  }
}
