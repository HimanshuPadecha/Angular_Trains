import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { authGuard } from './guards/auth-guard';
import { TrainAvaliability } from './train-avaliability/train-avaliability';
import { AboutUs } from './about-us/about-us';
import { FrequentlyAskedQuestions } from './frequently-asked-questions/frequently-asked-questions';
import { Contact } from './contact/contact';
import { PassengerFare } from './passenger-fare/passenger-fare';
import { authRequireGuard } from './guards/auth-require-guard';
import { bookingGuard } from './guard/booking-guard';
import { Signup } from './signup/signup';
import { Payment } from './payment/payment';
import { BookingConfirmation } from './booking-confirmation/booking-confirmation';
import { TrainCard } from './train-card/train-card';
import { BookingCard } from './booking-card/booking-card';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: Signup,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'train-availability',
    component: TrainAvaliability,
  },
  {
    path: 'about',
    component: AboutUs,
  },
  {
    path: 'faq',
    component: FrequentlyAskedQuestions,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'booking-confirmation',
    component: BookingConfirmation,
    canActivate: [authRequireGuard],
  },
  {
    path: 'booking-confirmation/:id',
    component: BookingCard,
    canActivate: [authRequireGuard],
  },
  {
    path: 'booking',
    canActivate: [authRequireGuard, bookingGuard],
    children: [
      {
        path: 'passenger-fare',
        component: PassengerFare,
      },
      {
        path: 'payment',
        component: Payment,
      },
    ],
  },
];
