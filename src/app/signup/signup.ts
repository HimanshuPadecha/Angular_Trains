import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTS, Error } from '../../types';
import { Auth } from '../auth';
import { UserContextService } from '../user-context';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  error = signal('');
  username = signal('');
  password = signal('');
  showPassword = signal(false);
  loading = signal(false);

  defaultPhoto = new File(['default image'], 'default_image.webp', { type: 'image/webp' });

  imagePreviewUrl = signal('/default_image.webp');
  image = signal<File>(this.defaultPhoto);

  private toaster = inject(ToastrService);
  private auth = inject(Auth);
  userContext = inject(UserContextService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.image.set(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.username() || !this.password()) {
      this.toaster.error('Please enter username and password to proceed !!');
      return;
    }

    if (this.password().length < 8) {
      this.toaster.error('Password must be greater than 8 chars. !! ');
      return;
    }

    const formData = new FormData();

    formData.append('username', this.username());
    formData.append('password', this.password());
    formData.append('profileImg', this.image());

    this.loading.set(true);

    this.auth.signup(formData).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.auth.login({ username: this.username(), password: this.password() }).subscribe({
          next: (response) => {
            const { user, accessToken } = response.response.data;

            if (!user || !accessToken) {
              this.toaster.error('Something went wrong when getting user or accessToken !!');
              return;
            }

            console.log('Login successfull', user);
            this.toaster.success('Logged in successfully !!');

            this.userContext.setUser(user);
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(CONSTS.ACCESS_TOKEN, accessToken);
            }

            console.log('Access Token stored successfully !!');
            this.router.navigate(['/home']);
          },
          error: (error: HttpErrorResponse) => {
            const backendError = error.error as Error;

            console.log('Login failed', error.error);

            this.toaster.error(backendError.message);
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);

        const backendError = error.error as Error;

        console.log('signup failed : ', backendError);

        this.toaster.error(backendError.message);
      },
    });
  }
}
