import { Component, input, output, WritableSignal } from '@angular/core';
import { classes, Filters, times, Train, TrainTypes } from '../../types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar-filters',
  imports: [NgClass],
  templateUrl: './sidebar-filters.html',
  styleUrl: './sidebar-filters.css',
  standalone: true,
})
export class SidebarFilters {
  filters = input.required<Filters>();

  filtersChange = output<Filters>();

  journeys: { id: classes; label: string }[] = [
    { id: 'SL', label: 'Sleeper (SL)' },
    { id: '3A', label: 'AC 3 Tier (3A)' },
    { id: '2A', label: 'AC 2 Tier (2A)' },
    { id: '1A', label: 'AC First Class (1A)' },
  ];

  trainTypes: { id: TrainTypes; label: string }[] = [
    { id: 'RAJDHANI', label: 'Rajdhani' },
    { id: 'SHATABDI', label: 'Shatabdi' },
    { id: 'DURONTO', label: 'Duronto' },
    { id: 'EXPRESS', label: 'Express' },
    { id: 'SUPERFAST', label: 'Superfast' },
  ];

  clearAllHandler() {
    this.filtersChange.emit({ class: [], time: null, type: null });
  }

  timeHandler(time: times) {
    if (this.filters().time === time) {
      this.filtersChange.emit({ ...this.filters(), time: null });
      return;
    }

    this.filtersChange.emit({ ...this.filters(), time });
  }

  handleClassChange(classId: classes) {
    this.filtersChange.emit({
      ...this.filters(),
      class: this.filters().class.includes(classId)
        ? [...this.filters().class.filter((filter) => filter !== classId)]
        : [...this.filters().class, classId],
    });
  }

  handleTrainTypeChange(trainId: TrainTypes) {
    this.filtersChange.emit({
      ...this.filters(),
      type: this.filters().type === trainId ? null : trainId,
    });
  }
}
