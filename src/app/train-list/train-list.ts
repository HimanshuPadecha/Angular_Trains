import { Component, input, WritableSignal } from '@angular/core';
import { TrainCard } from '../train-card/train-card';
import { SearchTrainsParams, Train } from '../../types';

@Component({
  selector: 'app-train-list',
  imports: [TrainCard],
  templateUrl: './train-list.html',
  styleUrl: './train-list.css',
})
export class TrainList {
  trains = input.required<Train[]>();
  searchParams = input.required<SearchTrainsParams>();
}
