import { Component, input, output, signal } from '@angular/core';
import { TrainCard } from '../train-card/train-card';
import { Filters, SearchTrainsParams, sort, Train } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-train-list',
  imports: [TrainCard, FormsModule],
  templateUrl: './train-list.html',
  styleUrl: './train-list.css',
})
export class TrainList {
  trains = input.required<Train[]>();
  searchParams = input.required<SearchTrainsParams>();
  filters = input.required<Filters>();

  filtersChange = output<Filters>();

  onSortingChange(event: Event) {
    const element = event.target as HTMLSelectElement;

    this.filtersChange.emit({
      ...this.filters(),
      sort: element.value as sort,
    });
  }
}
