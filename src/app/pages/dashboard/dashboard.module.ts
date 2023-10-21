import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule, DashboardViewComponent } from '#pages/dashboard';
import { ContainerComponent } from '#shared/components';
import { UiModule } from '#shared/ui';

const declarations: Type<any>[] = [DashboardViewComponent];

const imports: Type<any>[] = [
  CommonModule,
  DashboardRoutingModule,
  ChartModule,
  UiModule,
  CardModule,
  ProgressSpinnerModule,
  ContainerComponent,
];

@NgModule({ declarations, imports })
export class DashboardModule {}
