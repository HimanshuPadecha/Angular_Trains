import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Passenger, PassengerFromBackend, Prefs, Response } from '../../types';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../url';

@Component({
  selector: 'app-passager-forms',
  imports: [NgClass],
  templateUrl: './passenger-forms.html',
  styleUrl: './passenger-forms.css',
})
export class PassagerForms implements OnInit {
  ngOnInit(): void {
    this.getSavedPassengers();
  }

  preferences = [
    { id: 'lower', icon: 'vertical_align_bottom', label: 'LOWER' },
    { id: 'middle', icon: 'reorder', label: 'MIDDLE' },
    { id: 'upper', icon: 'vertical_align_top', label: 'UPPER' },
    { id: 'sidelower', icon: 'align_horizontal_left', label: 'SIDE L' },
    { id: 'sideupper', icon: 'align_horizontal_right', label: 'SIDE U' },
  ];

  showSaved = signal(false);
  passengers = input.required<Passenger[]>();
  phone = input.required<string>();
  email = input.required<string>();
  insureance = input.required<boolean>();

  savedPassenger: Passenger[] = [];

  private http = inject(HttpClient);

  passengersUpdate = output<Passenger[]>();
  phoneUpdate = output<string>();
  insurenceUpdate = output<boolean>();
  emailUpdate = output<string>();


  updateGender(id: number, gender: 'male' | 'female') {
    const updatedPassenger = this.passengers().map((passenger) => {
      if (passenger.id == id) {
        return { ...passenger, gender };
      }

      return passenger;
    });

    this.passengersUpdate.emit(updatedPassenger);
  }

  onNameChange(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const updatedPassengers = this.passengers().map((passenger) => {
      if (passenger.id == id) {
        return { ...passenger, name: value };
      }
      return passenger;
    });

    this.passengersUpdate.emit(updatedPassengers);
  }

  onAgeChange(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const updatedPassengers = this.passengers().map((passenger) => {
      if (passenger.id == id) {
        return { ...passenger, age: Number(value) };
      }
      return passenger;
    });

    this.passengersUpdate.emit(updatedPassengers);
  }

  onPrefChange(id: number, pref: string) {
    const updatedPassengers = this.passengers().map((passenger) => {
      if (passenger.id == id) {
        if (passenger.pref === pref) {
          return { ...passenger, pref: null };
        }
        return { ...passenger, pref: pref as Prefs };
      }

      return passenger;
    });

    this.passengersUpdate.emit(updatedPassengers);
  }

  canAddNewPassenger(): boolean {
    return this.passengers().every((passenger) => passenger.name !== '' && passenger.age > 0);
  }

  addNewPassenger() {
    this.passengersUpdate.emit([
      ...this.passengers(),
      { name: '', age: 0, gender: 'male', id: Date.now(), pref: null },
    ]);
  }

  getSavedPassengers() {
    this.http.get<Response<PassengerFromBackend[]>>(`${baseUrl}/users/saved-passengers`).subscribe({
      next: (response) => {
        console.log(response);

        this.savedPassenger = response.response.data.map((passenger) => ({
          name: passenger.fullName,
          age: Number(passenger.age),
          gender: passenger.gender as 'male' | 'female',
          id: passenger._id,
          pref: (passenger.berthPreference as Prefs) ?? null,
        }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onPhoneChange(event: Event) {
    const input = event.target as HTMLInputElement;

    let cleanValue = input.value.replace(/[^0-9]/g, '');

    this.phoneUpdate.emit(cleanValue);

    input.value = cleanValue;
  }
}
