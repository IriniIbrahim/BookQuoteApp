import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';
import { History } from './pages/history/history';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: Books },
  { path: 'quotes', component: Quotes },
  { path: 'history', component: History },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup }
];
