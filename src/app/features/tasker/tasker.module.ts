import { NgModule } from '@angular/core';

import { BoardListComponent } from '#tasker/components';
import { TaskerRoutingModule } from '#tasker/index';

const imports = [TaskerRoutingModule];
const declarations = [BoardListComponent];

@NgModule({ declarations, imports })
export class TaskerModule {}
