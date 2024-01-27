import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { AppPaths } from '#core/enums';
import { getTitle } from '#core/utils';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppPaths.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: AppPaths.DASHBOARD,
    canActivate: [AngularFireAuthGuard],
    loadChildren: async () => (await import('#dashboard/dashboard.module')).DashboardModule,
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
  },
  {
    path: AppPaths.AUTHENTICATION,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('auth'),
    data: { authGuardPipe: () => redirectLoggedInTo([AppPaths.DASHBOARD]) },
    loadChildren: async () => (await import('#auth/auth.module')).AuthModule,
  },
  {
    path: '**',
    loadComponent: async () => (await import('#shared/components/page-not-found/page-not-found.component')).PageNotFoundComponent,
    title: getTitle('pageNotFound'),
  },
];
