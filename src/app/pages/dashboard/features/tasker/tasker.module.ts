import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import { TaskerComponent, TaskerFacade } from '#pages/dashboard/features/tasker';
import { TaskFormComponent, NoteComponent, PanelComponent, TaskComponent } from '#pages/dashboard/features/tasker/components';

const routes: Routes = [{ path: '', component: TaskerComponent }];

const imports = [
  RouterModule.forChild(routes),
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
const declarations = [PanelComponent, TaskComponent, NoteComponent, TaskFormComponent, TaskerComponent];
const providers: Provider[] = [TaskerFacade];

@NgModule({ declarations, imports, providers })
export default class TaskerModule {}
