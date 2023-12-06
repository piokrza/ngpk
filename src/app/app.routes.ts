import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { AppPaths } from '#common/enums';
import { featureFlagGuard } from '#common/guards';
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
    path: AppPaths.WEB3,
    canMatch: [featureFlagGuard('web3')],
    loadChildren: () => import('#web3/web3.module'),
    title: getTitle('web3'),
  },
  {
    path: '**',
    loadComponent: () => import('#shared/components/page-not-found/page-not-found.component'),
    title: getTitle('pageNotFound'),
  },
];
