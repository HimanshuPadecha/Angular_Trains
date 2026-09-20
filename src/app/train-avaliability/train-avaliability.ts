import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SidebarFilters } from '../sidebar-filters/sidebar-filters';
import { TrainList } from '../train-list/train-list';
import { MobileNav } from '../mobile-nav/mobile-nav';
import { classes, Filters, SearchTrainsParams, timeMap, Train } from '../../types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-train-avaliability',
  imports: [SidebarFilters, TrainList, MobileNav],
  templateUrl: './train-avaliability.html',
  styleUrl: './train-avaliability.css',
})
export class TrainAvaliability implements OnInit {
  trains = signal<Train[]>([]);
  searchParams: SearchTrainsParams = {
    source: 'Source ',
    destination: 'Destination',
  };

  filteredTrains = computed(() => {
    let trains: Train[] = [];
    const filters = this.filters();

    if (!filters.class.length && !filters.time && !filters.type) {
      return this.trains();
    }

    if (filters.type !== null) {
      trains = [...trains, ...this.trains().filter((train) => train.trainType === filters.type)];
    }

    // class filter => filters.class array = train.classes
    if (filters.class.length) {
      trains = [
        ...trains,
        ...this.trains().filter((train) => {
          let current = false;

          train.classes.forEach((item) => {
            if (filters.class.includes(item.className as classes)) {
              current = true;
            }
          });

          return current;
        }),
      ];
    }

    if (this.searchParams.source !== 'Source' && filters.time) {
      trains = [
        ...trains,
        ...this.trains().filter((train) => {
          const station = train.stops.find(
            (station) => station.stationName === this.searchParams.source,
          );

          if (!station) {
            return false;
          }

          const stationTime = Number.parseInt(station.arrivalTime.split(':')[0]);
          const filterTime = timeMap.find((item) => item.timezone === filters.time);

          if (Number.isNaN(stationTime) || !filterTime) {
            return false;
          }

          if (stationTime >= filterTime.start && stationTime <= filterTime.end) {
            return true;
          }

          return false;
        }),
      ];
    }

    return trains;
  });

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const { trains, searchParams }: { trains: Train[]; searchParams: SearchTrainsParams } =
        history.state;
      this.trains.set(trains);
      this.searchParams = searchParams;

      console.log(this.trains());
    }
  }

  filters = signal<Filters>({ class: [], time: null, type: null });

  onFilterChange(filter: Filters) {
    this.filters.set(filter);
  }
}
