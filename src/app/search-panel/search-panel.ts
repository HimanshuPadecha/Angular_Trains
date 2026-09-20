import { Component, inject, signal } from '@angular/core';
import { StationInput } from '../station-input/station-input';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../url';
import { SearchTrainsParams, Train, Response } from '../../types';
import { UserContextService } from '../user-context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-panel',
  imports: [StationInput, FormsModule],
  templateUrl: './search-panel.html',
  styleUrl: './search-panel.css',
})
export class SearchPanel {
  travelingOptions = [
    {
      value: '1A',
      text: 'AC First Class (1A)',
    },
    {
      value: '2A',
      text: 'AC 2 Tier (2A)',
    },
    {
      value: '3A',
      text: 'AC 3 Tier (3A)',
    },
    {
      value: 'SL',
      text: 'Sleeper (SL)',
    },
  ];

  trainType = [
    {
      value: 'SUPERFAST',
      text: 'SuperFast',
    },
    {
      value: 'EXPRESS',
      text: 'Express',
    },
    {
      value: 'DURONTO',
      text: 'Duronto',
    },
    {
      value: 'RAJDHANI',
      text: 'Rajdhani',
    },
    {
      value: 'SHATABDI',
      text: 'Shatabdi',
    },
    {
      value: 'VANDE BHARAT',
      text: 'Vande Bharat',
    },
  ];

  fromStation = signal<string>('');
  toStation = signal<string>('');
  travelOpt = 'ALL';
  trainOpt = 'ALL';
  today = new Date().toISOString().split('T')[0];
  selectedDate = this.today;
  loading = signal(false);

  toggleStation = false;

  private toastr = inject(ToastrService);
  private http = inject(HttpClient);
  private userContext = inject(UserContextService);
  private router = inject(Router);

  handleToggle() {
    if (!this.fromStation() || !this.toStation()) {
      return;
    }
    this.toggleStation = !this.toggleStation;
  }

  handleTrainSearch() {
    if (!this.fromStation() || !this.toStation()) {
      this.toastr.error('Select source and destination in order to search trains');
      return;
    }

    const requestInput: SearchTrainsParams = {
      source: this.fromStation(),
      destination: this.toStation(),
      date: this.selectedDate,
      trainType: this.trainOpt,
      travelClass: this.trainOpt,
    };

    if (this.userContext.isLoggedIn()) {
      this.http
        .post(`${baseUrl}/users/recent-searches`, {
          source: this.fromStation(),
          destination: this.toStation(),
          date: this.selectedDate,
        })
        .subscribe({
          next: (response) => {
            console.log('Search added successfully !!');
            console.log(response);
          },
          error: (error) => {
            console.log('Something went wrong when adding the search :', error);
          },
        });
    }

    this.loading.set(true);

    this.http.post<Response<Train[]>>(`${baseUrl}/trains/search`, requestInput).subscribe({
      next: (response) => {
        const trains = response.response.data;

        this.toastr.success(
          `Trains for ${this.fromStation()} to ${this.toStation()} Fetched successfully !! `,
        );

        this.loading.set(false);

        this.router.navigate(['/train-availability'], {
          state: {
            trains,
            searchParams: requestInput,
          },
        });
      },
      error: (error) => {
        console.log(error.error);
        this.loading.set(false);
      },
    });
  }
}
