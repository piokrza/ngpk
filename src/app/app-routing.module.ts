/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '#pages/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> => import('#pages/dashboard/dashboard.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'incomes',
    loadChildren: (): Promise<any> => import('#pages/incomes/incomes.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'expenses',
    loadChildren: (): Promise<any> => import('#pages/expenses/expenses.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'settings',
    loadChildren: (): Promise<any> => import('#pages/settings/settings.module'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'authentication',
    loadChildren: (): Promise<any> => import('#pages/auth/auth.module').then((m): AuthModule => m.AuthModule),
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
