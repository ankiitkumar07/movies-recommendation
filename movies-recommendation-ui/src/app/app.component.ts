import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModules } from './material';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, MatToolbarModule, MaterialModules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public activeLink = 'search';
  public tabs = [
    {
      id: 1,
      name: 'Search',
      link: 'search',
    },
    {
      id: 2,
      name: 'Profile',
      link: 'profile',
    },
    {
      id: 3,
      name: 'My List',
      link: 'my-list',
    },
  ];

  private readonly router = inject(Router);

  navigate(link: string) {
    this.activeLink = link;
    this.router.navigate([link]);
  }

  title = 'movies-recommendation-ui';
}
