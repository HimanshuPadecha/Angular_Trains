import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bookingGuard } from './booking-guard';

describe('bookingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => bookingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
