import { HttpClient } from '@angular/common/http';
import { Component, inject, input, output, Signal, signal, WritableSignal } from '@angular/core';
import { Response } from '../../types';
import { baseUrl } from '../url';

@Component({
  selector: 'app-station-input',
  imports: [],
  templateUrl: './station-input.html',
  styleUrl: './station-input.css',
})
export class StationInput {
  stationPlaceholder = input.required<string>();
  inputLabel = input.required<string>();
  icon = input.required<string>();
  query = input.required<string>();

  queryOutput = output<string>();

  private http = inject(HttpClient);

  stations = signal<string[]>([]);
  loading = false;

  selectStation(station: string): void {
    this.queryOutput.emit(station)

    this.stations.set([]);
  }

  onQueryChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (!value || value.length < 3) {
      console.log('Too short Station name !!');
      this.stations.set([]);
      return;
    }

    this.queryOutput.emit(value)

    this.loading = true;
    this.http
      .get<Response<string[]>>(baseUrl + '/trains/stations?query=' + this.query())
      .subscribe({
        next: (response) => {
          this.stations.set(response.response.data);
          console.log(this.stations());
          this.loading = false;
        },
        error: (error) => {
          console.log('Error while fetching the stations :', error);
          this.loading = false;
        },
      });
  }
}
