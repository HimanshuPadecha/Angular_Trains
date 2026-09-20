import { Component, inject, signal } from '@angular/core';
import { Booking, Error, ILiveStatus } from '../../types';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { baseUrl } from '../url';
import { Response } from '../../types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-quick-access',
  imports: [NgClass],
  templateUrl: './quick-access.html',
  styleUrl: './quick-access.css',
})
export class QuickAccess {
  // pnr Status Code
  error = signal<string>('');
  pnrData = signal<Booking | null>(null);
  loading = signal(false);
  pnrNumber = signal('');

  private toastr = inject(ToastrService);
  private http = inject(HttpClient);

  handlePnrChange(event: Event): void {
    if (this.error()) {
      this.error.set('');
    }
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d*$/.test(value)) {
      input.value = this.pnrNumber();
      return;
    }

    this.pnrNumber.set(value);
  }

  handleCheckStatus(): void {
    if (this.pnrNumber().length !== 10) {
      this.toastr.error('PNR number must be 10 digits');
      return;
    }

    this.loading.set(true);
    this.http.get<Response<Booking>>(`${baseUrl}/bookings/pnr/${this.pnrNumber()}`).subscribe({
      next: (response) => {
        this.pnrData.set(response.response.data);
        this.loading.set(false);
        this.pnrNumber.set('');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);

        const backendError = error.error as Error;
        this.error.set(backendError.message);
        this.loading.set(false);
      },
    });
  }

  // Live Train Track Code
  trackTrainError = signal<string>('');
  trainNo = signal<string>('');
  trainStatusLoading = signal(false);
  liveStatus = signal<ILiveStatus | null>(null);

  handleTrainNoChange(event: Event) {
    if (this.trackTrainError()) {
      this.trackTrainError.set('');
    }
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d*$/.test(value)) {
      input.value = this.trainNo();
      return;
    }

    this.trainNo.set(value);
  }

  handleTrainStatusClick() {
    if (!this.trainNo()) {
      this.toastr.error('Enter Train No to check Live status of the train !!');
      return;
    }

    this.trainStatusLoading.set(true);

    this.http.get<Response<ILiveStatus>>(`${baseUrl}/trains/live/${this.trainNo()}`).subscribe({
      next: (response) => {
        this.liveStatus.set(response.response.data);
        this.trainStatusLoading.set(false);
        console.log(this.liveStatus());
      },
      error: (error: HttpErrorResponse) => {
        const backendError = error.error as Error;

        console.log(error);
        this.toastr.error(backendError.message);
        this.trainStatusLoading.set(false);
      },
    });
  }
}
