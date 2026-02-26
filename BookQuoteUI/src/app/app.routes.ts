import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';
import { Archive } from './pages/archive/archive';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MyFavorites } from './pages/my-favorites/my-favorites';
import { authGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: Books },
  { path: 'quotes', component: Quotes },
  { path: 'my-favorites', component: MyFavorites },
  { path: 'archive', component: Archive },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
