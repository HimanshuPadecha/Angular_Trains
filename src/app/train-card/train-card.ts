import { Component, input, signal } from '@angular/core';
import { Train } from '../../types';

@Component({
  selector: 'app-train-card',
  imports: [],
  templateUrl: './train-card.html',
  styleUrl: './train-card.css',
})
export class TrainCard {
  train = input.required<Train>();
  showRoute = signal(false);
}
