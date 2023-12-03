import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { AppPaths } from '#common/enums';
import { getTitle } from '#common/utils';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppPaths.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: AppPaths.DASHBOARD,
    loadChildren: (): Promise<any> => import('#dashboard/dashboard.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
  },
  {
    path: AppPaths.AUTHENTICATION,
    loadChildren: (): Promise<any> => import('#auth/auth.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo([AppPaths.DASHBOARD]) },
    title: getTitle('auth'),
  },
  {
    path: '**',
    loadComponent: () => import('#shared/components/page-not-found/page-not-found.component'),
    title: getTitle('pageNotFound'),
  },
];
