import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: async () => (await import('@ngpk/playground/feature')).CrudModule,
  },
];
