import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxRoutingModule } from '@inbox/.';

import { EmailService } from '@inbox/services';
import { InboxApi } from '@inbox/api';
import { InboxState } from '@inbox/state';
import { SharedModule } from '@shared/.';
import { DialogService } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailResolver } from '@auth/resolvers';
import {
  HomeComponent,
  EmailCreateComponent,
  EmailIndexComponent,
  EmailReplyComponent,
  EmailShowComponent,
  PlaceholderComponent,
} from '@inbox/components';

const declarations = [
  HomeComponent,
  EmailCreateComponent,
  EmailIndexComponent,
  EmailReplyComponent,
  EmailShowComponent,
  PlaceholderComponent,
];
const imports = [CommonModule, InboxRoutingModule, SharedModule, ReactiveFormsModule];
const providers = [EmailService, InboxApi, InboxState, DialogService, InboxApi, EmailResolver];

@NgModule({
  declarations,
  imports,
  providers,
})
export class InboxModule {}
