import { Routes } from '@angular/router';
import { AppShellComponent } from './app-shell.component';

export const AppShellRoutes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'select', pathMatch: 'full' },
      {
        path: 'select',
        loadComponent: () =>
          import('./../select-demo/select-demo.component').then(
            (c) => c.SelectDemoComponent
          ),
      },
      {
        path: 'multi-select',
        loadComponent: () =>
          import('./../multiselect-demo/multiselect-demo.component').then(
            (c) => c.MultiselectDemoComponent
          ),
      },
      {
        path: 'tree-select',
        loadComponent: () =>
          import('./../treeselect-demo/treeselect-demo.component').then(
            (c) => c.TreeselectDemoComponent
          ),
      },
    ],
  },
];
