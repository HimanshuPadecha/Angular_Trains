import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BookingService } from '../booking';

export const bookingGuard: CanActivateFn = (route, state) => {
  // passanger fare route guard
  const bookingService = inject(BookingService);

  if (state.url === 'booking/passenger-fare') {
    if (!bookingService.containsTrainInfo()) {
      return false;
    }
  }

  return true;
};
