import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CONSTS, User } from '../types';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  private platformId = inject(PLATFORM_ID);

  readonly user = signal<User | null>(null);
  private initialized = signal(false);

  readonly currentUser = this.user.asReadonly();
  readonly isInitialized = this.initialized.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.restoreUser();
    }
  }

  private restoreUser(): void {
    const storedUser = localStorage.getItem(CONSTS.USER);

    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    }

    this.initialized.set(true);
  }

  setUser(user: User): void {
    this.user.set(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CONSTS.USER, JSON.stringify(user));
    }

    this.initialized.set(true);
  }

  clearUser(): void {
    this.user.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(CONSTS.USER);
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
    }
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }
}
