import { Component, input } from '@angular/core';
import { Class, Train } from '../../types';

@Component({
  selector: 'app-traininfo-banner',
  imports: [],
  templateUrl: './traininfo-banner.html',
  styleUrl: './traininfo-banner.css',
})
export class TraininfoBanner {
  train = input.required<Train>();
  selectedClass = input.required<Class>()
}
