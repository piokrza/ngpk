import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { EmailPath } from '@ngpk/email/enum';
import { emailResolver } from '@ngpk/email/resolver';
import { EmailService } from '@ngpk/email/service';
import { InboxStateService } from '@ngpk/email/state/inbox';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/email/component/inbox')).HomeComponent,
    children: [
      {
        path: EmailPath.NOT_FOUND,
        loadComponent: async () => (await import('@ngpk/email/component/shared')).NotFoundPageComponent,
      },
      {
        path: ':id',
        loadComponent: async () => (await import('@ngpk/email/component/inbox')).EmailShowComponent,
        resolve: { email: emailResolver },
      },
      {
        path: '',
        loadComponent: async () => (await import('@ngpk/email/component/inbox')).PlaceholderComponent,
      },
    ],
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [EmailService, InboxStateService, DialogService];

@NgModule({ imports, providers })
export class InboxModule {}
