import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { NoteComponent, PanelComponent, TaskComponent, TaskSectionComponent } from '#features/tasker/components';
import { TaskFormService } from '#features/tasker/services';

const imports = [
  CommonModule,
  TranslateModule,
  CardModule,
  DataViewModule,
  TabViewModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
];
const declarations = [PanelComponent, TaskComponent, NoteComponent, TaskSectionComponent];
const providers: Provider[] = [TaskFormService];

@NgModule({ declarations, imports, providers, exports: [PanelComponent] })
export class TaskerModule {}
