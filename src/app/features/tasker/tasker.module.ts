import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TabViewModule } from 'primeng/tabview';

import { PanelComponent } from '#features/tasker/components';

const imports = [CommonModule, TranslateModule, CardModule, DataViewModule, TabViewModule];
const declarations = [PanelComponent];

@NgModule({ declarations, imports, exports: [PanelComponent] })
export class TaskerModule {}
