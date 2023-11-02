import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import { TaskFormComponent, NoteComponent, PanelComponent, TaskComponent } from '#features/tasker/components';

const imports = [
  CommonModule,
  TranslateModule,
  CardModule,
  DataViewModule,
  TabViewModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  ProgressSpinnerModule,
  FormsModule,
];
const declarations = [PanelComponent, TaskComponent, NoteComponent, TaskFormComponent];

@NgModule({ declarations, imports, exports: [PanelComponent] })
export class TaskerModule {}
