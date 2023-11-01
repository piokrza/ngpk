/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AppPaths } from '#common/enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppPaths.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: AppPaths.DASHBOARD,
    loadChildren: (): Promise<any> => import('#pages/dashboard/dashboard.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
  },
  {
    path: AppPaths.AUTHENTICATION,
    // canMatch: [isLoggedInGuard], TODO: fix
    loadChildren: (): Promise<any> => import('#pages/auth/auth.module'),
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
