import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'login',
    loadComponent: () => import('../auth/login/login.component')
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];
