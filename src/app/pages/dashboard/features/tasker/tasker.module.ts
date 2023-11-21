import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';

import { TaskerComponent, TaskerFacade } from '#pages/dashboard/features/tasker';
import {
  TaskFormComponent,
  PanelComponent,
  TaskComponent,
  NoteFormComponent,
  NotesComponent,
} from '#pages/dashboard/features/tasker/components';

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
  SelectButtonModule,
  CheckboxModule,
  InputTextareaModule,
  AccordionModule,
  DividerModule,
];
const declarations = [PanelComponent, TaskComponent, TaskFormComponent, TaskerComponent, NoteFormComponent, NotesComponent];
const providers: Provider[] = [TaskerFacade];

@NgModule({ declarations, imports, providers })
export default class TaskerModule {}
