import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { baseUrl } from '../url';
import { Alerts, Response } from '../../types';

@Component({
  selector: 'app-news-ticker',
  imports: [],
  templateUrl: './news-ticker.html',
  styleUrl: './news-ticker.css',
})
export class NewsTicker implements OnInit {
  private http = inject(HttpClient);
  alerts = signal<Alerts[] | null>(null);

  ngOnInit(): void {
    this.fetchAlerts();
  }

  fetchAlerts() {
    this.http.get<Response<Alerts[]>>(`${baseUrl}/alerts`).subscribe({
      next: (response) => {
        this.alerts.set(response.response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
