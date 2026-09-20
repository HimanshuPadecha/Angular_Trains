import {
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { Auth } from '../auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserContextService } from '../user-context';
import { CONSTS } from '../../types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = signal('');
  password = signal('');
  error = signal('');
  isPasswordVisible: boolean = false;
  loading = signal(false);

  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

  constructor() {
    afterNextRender(() => {
      this.usernameInput.nativeElement.focus();
    });
  }

  private authService = inject(Auth);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private userContext = inject(UserContextService);
  private platformId = inject(PLATFORM_ID);

  onUsernameInput($event: Event): void {
    const value = (event?.target as HTMLInputElement).value;
    this.error.set('');
    this.username.set(value);
  }

  handleLogin(): void {
    this.error.set('');
    if (!this.username() || !this.password()) {
      this.error.set('Username or password cannot be empty !');
      return;
    }

    this.loading.set(true);

    this.authService.login({ username: this.username(), password: this.password() }).subscribe({
      next: (response) => {
        this.loading.set(false);
        const { user, accessToken } = response.response.data;

        if (!user || !accessToken) {
          this.toastr.error('Something went wrong when getting user or accessToken !!');
          return;
        }

        console.log('Login successfull', user);
        this.toastr.success('Logged in successfully !!');

        this.userContext.setUser(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(CONSTS.ACCESS_TOKEN, accessToken);
        }

        console.log('Access Token stored successfully !!');
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        const backendError = error.error as Error;

        console.log('Login failed', error.error);

        this.toastr.error(backendError.message);
      },
    });
  }
}
