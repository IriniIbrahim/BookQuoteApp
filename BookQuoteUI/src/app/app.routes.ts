import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';
import { Archive } from './pages/archive/archive';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: Books },
  { path: 'quotes', component: Quotes },
  { path: 'archive', component: Archive },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup }
];
