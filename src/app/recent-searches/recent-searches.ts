import { Component, inject, OnInit, signal } from '@angular/core';
import { UserContextService } from '../user-context';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { baseUrl } from '../url';
import { Search, Response, Error } from '../../types';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-searches',
  imports: [RouterLink],
  templateUrl: './recent-searches.html',
  styleUrl: './recent-searches.css',
})
export class RecentSearches implements OnInit {
  userContext = inject(UserContextService);
  private http = inject(HttpClient);
  searches = signal<Search[] | null>(null);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    if (this.userContext.isInitialized() && this.userContext.isLoggedIn()) {
      this.fetchRecentSearches();
    }
  }

  fetchRecentSearches() {
    this.http
      .get<Response<Search[]>>(`${baseUrl}/users/recent-searches`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          let searches = response.response.data as Search[];
          this.searches.set(
            searches.map((search) => ({ ...search, date: search.date.split('T')[0] })),
          );
        },
        error: (error: HttpErrorResponse) => {
          const backendError = error.error as Error;

          if (backendError.message === 'TokenExpiredError') {
            console.log('Token Expired Logging you out!');

            this.toastr.error('Token expired. Logging you out !!');
            this.userContext.clearUser();
            return;
          }

          this.toastr.error(backendError.message);
        },
      });
  }
}
