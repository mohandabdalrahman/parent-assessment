import { Routes } from '@angular/router';
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./app/app.component')
  },
  {
    path:'login',
    loadComponent: () => import('./auth/login/login.component')
  },
  {path: '', redirectTo: 'app', pathMatch: 'full'},
];
