import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SidebarFilters } from '../sidebar-filters/sidebar-filters';
import { TrainList } from '../train-list/train-list';
import { MobileNav } from '../mobile-nav/mobile-nav';
import { classes, Filters, SearchTrainsParams, time, timeMap, Train } from '../../types';
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
    source: 'Source',
    destination: 'Destination',
  };

  filteredTrains = computed(() => {
    let trains: Train[] = [];
    const filters = this.filters();

    if (!filters.class.length && !filters.time && !filters.type && filters.sort === null) {
      return this.trains();
    }

    if (filters.type !== null) {
      trains = [...trains, ...this.trains().filter((train) => train.trainType === filters.type)];
    }

    // class filter => filters.class array = train.classes
    if (filters.class.length < 0) {
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

    // sorting logic
    if (this.searchParams.source === 'Source') {
      return trains;
    }

    if (filters.class.length === 0 && filters.time === null && filters.type === null) {
      trains = this.trains();
    }

    if (filters.sort === 'DT' || filters.sort === 'EA') {
      trains.sort((one, two) => {
        const firstStation = one.stops.find(
          (station) => station.stationName === this.searchParams.source,
        );

        const secondStation = two.stops.find(
          (station) => station.stationName === this.searchParams.source,
        );

        console.log(firstStation, secondStation);

        if (
          !firstStation ||
          !secondStation ||
          Number.isNaN(
            Number.parseInt(
              filters.sort === 'DT'
                ? firstStation.departureTime.split(':')[0]
                : firstStation.arrivalTime.split(':')[0],
            ) -
              Number.parseInt(
                filters.sort === 'DT'
                  ? secondStation.departureTime.split(':')[0]
                  : secondStation.arrivalTime.split(':')[0],
              ),
          )
        ) {
          return 0;
        }

        return (
          Number.parseInt(
            filters.sort === 'DT'
              ? firstStation.departureTime.split(':')[0]
              : firstStation.arrivalTime.split(':')[0],
          ) -
          Number.parseInt(
            filters.sort === 'DT'
              ? secondStation.departureTime.split(':')[0]
              : secondStation.arrivalTime.split(':')[0],
          )
        );
      });
    } else if (filters.sort === 'D') {
      trains.sort((one, two) => {
        const oneSourceStation = one.stops.find(
          (station) => station.stationName === this.searchParams.source,
        );
        const oneDestinationStation = one.stops.find(
          (station) => station.stationName === this.searchParams.destination,
        );

        if (!oneSourceStation || !oneDestinationStation) {
          return 0;
        }

        const oneDuration = this.findDuration(
          oneSourceStation.arrivalTime,
          oneDestinationStation.arrivalTime,
        );

        const twoSourceStation = two.stops.find(
          (station) => station.stationName === this.searchParams.source,
        );

        const twoDestinationStation = two.stops.find(
          (station) => station.stationName === this.searchParams.destination,
        );

        if (!twoSourceStation || !twoDestinationStation) {
          return 0;
        }

        const twoDuration = this.findDuration(
          twoSourceStation.arrivalTime,
          twoSourceStation.arrivalTime,
        );

        return oneDuration - twoDuration;
      });
    }

    return trains;
  });

  private platformId = inject(PLATFORM_ID);

  private findDuration(arrivalTime: string, reachedTime: string): number {
    const arrival: time = {
      hours: Number.parseInt(arrivalTime.split(':')[0]),
      min: Number.parseInt(arrivalTime.split(':')[1]),
    };
    const reached: time = {
      hours: Number.parseInt(reachedTime.split(':')[0]),
      min: Number.parseInt(reachedTime.split(':')[1]),
    };

    if (arrival.hours === reached.hours && arrival.min === reached.min) {
      return 24 * 60;
    }

    const arrivalMinutes = arrival.hours * 60 + arrival.min;
    const reachedMinutes = reached.hours * 60 + reached.min;

    if (arrivalMinutes > reachedMinutes) {
      const hours = 24 - arrival.hours + reached.hours;
      const minutes = Math.abs(arrival.min - reached.min);

      const totalMinutes = hours * 60;
      return totalMinutes - minutes;
    }

    return Math.abs(arrivalMinutes - reachedMinutes);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const { trains, searchParams }: { trains: Train[]; searchParams: SearchTrainsParams } =
        history.state;
      this.trains.set(trains);
      this.searchParams = searchParams;
    }
  }

  filters = signal<Filters>({ class: [], time: null, type: null, sort: null });

  onFilterChange(filter: Filters) {
    this.filters.set(filter);
  }
}
