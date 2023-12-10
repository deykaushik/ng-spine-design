import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./tooltip/tooltip.component').then((c) => c.TooltipComponent),
  },
  { path: '', redirectTo: 'tooltip', pathMatch: 'full' },
];
