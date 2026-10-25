import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserContextService } from '../user-context';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../auth';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../url';
import { Response, User } from '../../types';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(Auth);
  userContext = inject(UserContextService);
  private http = inject(HttpClient);

  public navItems = [
    { name: 'Home', path: '/' },
    { name: 'Availability', path: '/train-availability' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Bookings', path: '/booking-confirmation' },
  ];

  profileImage = signal(this.userContext.user()?.profileImg);

  onProfileImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append('profileImg', file);

    this.http.patch<Response<User>>(`${baseUrl}/users/profile-image`, formData).subscribe({
      next: (response) => {
        console.log(response.response);
        this.profileImage.set(response.response.data.profileImg);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: (_) => {
        this.toastr.success('Logged out successfully !!');
        this.router.navigate(['/login']);
        this.userContext.clearUser();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Something went wrong when logging you out !!');
      },
    });
  }
}
