export interface Response<T> {
  response: {
    data: T;
    statusCode: number;
    success: boolean;
    message: string;
  };
}

export interface Error {
  data: null;
  message: string;
  success: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  profileImg?: string;
  recentSearches: Array<{
    source: string;
    destination: string;
    date: Date;
  }>;
  savedPassengers: Array<{
    fullName: string;
    age: string | number;
    gender: string;
    berthPreference: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export const CONSTS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
};

export interface Booking {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  train: {
    _id: string;
    trainNumber: string;
    trainName: string;
    source: string;
    destination: string;
    arrivalTime : string;
    departureTime : string
  };
  sourceStation?: string;
  destinationStation?: string;
  pnrNumber: string;
  className: string;
  passengers: Array<{
    fullName: string;
    age: number | string;
    gender: string;
    berthPreference?: string;
    berthAllocated?: string;
    status: 'CONFIRMED' | 'RAC' | 'WL';
  }>;
  contactEmail: string;
  contactPhone: string;
  fareBreakdown: {
    baseFare: number;
    superfastCharge: number;
    reservationCharge: number;
    insurance: number;
    gst: number;
    totalAmount: number;
  };
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  dateOfJourney: Date;
  createdAt: Date;
  updatedAt: Date;
}

// const liveStatus = {
//   trainNumber: train.trainNumber,
//   trainName: train.trainName,
//   currentStation: train.source, // Mocked
//   delayMinutes: Math.floor(Math.random() * 30), // Mock random delay
//   statusMessage: "On Route",
//   scheduledDeparture: train.departureTime,
//   scheduledArrival: train.arrivalTime,
// };

export interface ILiveStatus {
  trainNumber: string;
  trainName: string;
  currentStation: string;
  delayMinutes: number;
  statusMessage: string;
  scheduledDeparture: string;
  scheduledArrival: string;
}

export interface Search {
  source: string;
  destination: string;
  date: string;
  _id: string;
}

export interface Alerts {
  id: string;
  message: string;
  type: string;
  active: boolean;
}

export interface SearchTrainsParams {
  source: string;
  destination: string;
  date?: string;
  travelClass?: string;
  trainType?: string;
  availableBerth?: string;
}

export interface Class {
  className: string;
  fare: number;
  totalSeats: number;
  availableSeats: number;
  _id: string;
}

export interface Train {
  _id: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  daysOfOperation: string[];
  stops: Array<{
    stationName: string;
    arrivalTime: string;
    departureTime: string;
    stopOrder: number;
    distance?: number;
    _id: string;
  }>;
  classes: Array<Class>;
  createdAt: Date;
  updatedAt: Date;
}

export type times = 'MORNING' | 'NOON' | 'EVENING' | 'NIGHT';
export type classes = 'SL' | '3A' | '2A' | '1A';
export type TrainTypes = 'RAJDHANI' | 'SHATABDI' | 'DURONTO' | 'EXPRESS' | 'SUPERFAST';
export type sort = 'DT' | 'D' | 'EA';

export interface Filters {
  time: times | null;
  class: classes[];
  type: TrainTypes | null;
  sort: sort | null;
}

export const timeMap: { timezone: times; start: number; end: number }[] = [
  {
    timezone: 'MORNING',
    start: 0,
    end: 6,
  },
  {
    timezone: 'NOON',
    start: 6,
    end: 12,
  },
  {
    timezone: 'EVENING',
    start: 12,
    end: 18,
  },
  {
    timezone: 'NIGHT',
    start: 18,
    end: 24,
  },
];

export type time = {
  hours: number;
  min: number;
};

export type Prefs = 'lower' | 'middle' | 'upper' | 'sidelower' | 'sideupper';

export type Passenger = {
  id: number;
  name: string;
  age: number;
  gender: 'male' | 'female';
  pref: Prefs | null;
};

export type PassengerFromBackend = {
  _id: number;
  fullName: string;
  gender: 'male' | 'female';
  age: string;
  berthPreference?: string;
};

export type Methods = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLETS';

export type UpiApps = 'GPAY' | 'PHONEPE' | 'PAYTM'