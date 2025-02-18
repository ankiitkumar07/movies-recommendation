import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search/search.component').then((c) => c.SearchComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: 'my-list',
    loadComponent: () =>
      import('./my-list/my-list.component').then((c) => c.MyListComponent),
  },
];
