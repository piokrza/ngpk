import { NgModule } from '@angular/core';

import { BoardListComponent } from '#tasker/components';
import { TaskerRoutingModule } from '#tasker/index';
import { BoardsApiService, BoardsService } from '#tasker/services';
import { BoardsStore } from '#tasker/state';

const imports = [TaskerRoutingModule];
const declarations = [BoardListComponent];
const providers = [BoardsStore, BoardsApiService, BoardsService];

@NgModule({ declarations, providers, imports })
export class TaskerModule {}
