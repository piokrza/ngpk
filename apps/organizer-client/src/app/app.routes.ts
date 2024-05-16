import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Route } from '@angular/router';

import { OrganizerPaths } from '@ngpk/core/enum';
import { getTitle } from '@ngpk/core/util';

export const appRoutes: Route[] = [
  {
    path: '',
    title: getTitle('home'),
    loadComponent: async () => (await import('@ngpk/search/feature')).SearchComponent,
  },
  {
    path: OrganizerPaths.TASKER,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('tasker'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([OrganizerPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('@ngpk/organizer/feature/tasker')).TaskerModule,
  },
  {
    path: OrganizerPaths.CASH_FLOW,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('cashFlow'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([OrganizerPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('@ngpk/organizer/feature/cash-flow')).CashFlowModule,
  },
  {
    path: OrganizerPaths.DRIVE,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('drive'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([OrganizerPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('@ngpk/organizer/feature/drive')).DriveModule,
  },
  {
    path: OrganizerPaths.SETTINGS,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('settings'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([OrganizerPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('@ngpk/settings-organizer/feature')).SettingsModule,
  },
  {
    path: OrganizerPaths.AUTHENTICATION,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('auth'),
    data: { authGuardPipe: () => redirectLoggedInTo(['']) },
    loadChildren: async () => (await import('@ngpk/organizer/feature/auth')).AuthModule,
  },
  {
    path: '**',
    loadComponent: async () => (await import('@ngpk/shared-ui/components')).PageNotFoundComponent,
    title: getTitle('pageNotFound'),
  },
];
