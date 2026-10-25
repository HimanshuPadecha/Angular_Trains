import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRequireGuard } from './auth-require-guard';

describe('authRequireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authRequireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
