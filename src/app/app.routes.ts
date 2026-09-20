import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { authGuard } from './guards/auth-guard';
import { TrainAvaliability } from './train-avaliability/train-avaliability';
import { AboutUs } from './about-us/about-us';
import { FrequentlyAskedQuestions } from './frequently-asked-questions/frequently-asked-questions';
import { Contact } from './contact/contact';

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
];
