import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailResolver } from '@auth/resolvers';
import { NotFoundPageComponent } from '@shared/components';
import { EmailShowComponent, HomeComponent, PlaceholderComponent } from '@inbox/components';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundPageComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: { email: EmailResolver },
      },
      {
        path: '',
        component: PlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
