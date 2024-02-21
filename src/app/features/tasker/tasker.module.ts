import { NgModule } from '@angular/core';

import { TaskerComponent } from '#tasker/components';
import { TaskerRoutingModule } from '#tasker/index';

const imports = [TaskerRoutingModule];
const declarations = [TaskerComponent];

@NgModule({ declarations, imports })
export class TaskerModule {}
