import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@ngpk/email/guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('@ngpk/email/feature/auth')).AuthModule,
  },
  {
    canMatch: [authGuard],
    path: 'inbox',
    loadChildren: async () => (await import('@ngpk/email/feature/inbox')).InboxModule,
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
