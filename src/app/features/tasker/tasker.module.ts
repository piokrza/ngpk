import { NgModule } from '@angular/core';

import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';

import { TaskerRoutingModule } from '#tasker/index';
import { BoardsFacadeService } from '#tasker/services';

const imports = [TaskerRoutingModule, ConfirmDialogModule];
const providers = [BoardsFacadeService, ConfirmDialog];

@NgModule({ imports, providers })
export class TaskerModule {}
