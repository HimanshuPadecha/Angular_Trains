import { Component, effect, inject, input, signal } from '@angular/core';
import { Class, Train } from '../../types';
import { BookingService } from '../booking';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-train-card',
  imports: [NgClass],
  templateUrl: './train-card.html',
  styleUrl: './train-card.css',
})
export class TrainCard {
  train = input.required<Train>();
  selectedClass = signal<string>('');

  private toastr = inject(ToastrService);
  bookingService = inject(BookingService);
  router = inject(Router);

  constructor() {
    effect(() => {
      const train = this.train();
      this.selectedClass.set(train.classes[0]._id);
    });
  }

  onClassClick(id: string) {
    this.selectedClass.set(id);
  }

  handleBookNow() {
    this.bookingService.addTrain(this.train());

    const selectedClass = this.train().classes.find((item) => item._id === this.selectedClass());

    if (!selectedClass) {
      this.toastr.error('Something went wrong when searching for the class ! Please try again !!');
      return;
    }

    this.bookingService.addTrainClass(selectedClass);
    this.router.navigate(['/booking/passenger-fare']);
  }

  showRoute = signal(false);
}
