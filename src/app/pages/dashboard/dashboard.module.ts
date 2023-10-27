import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule, DashboardViewComponent } from '#pages/dashboard';
import { ContainerComponent } from '#shared/components';
import { UiModule } from '#shared/ui';

const declarations = [DashboardViewComponent];
const imports = [
  CommonModule,
  DashboardRoutingModule,
  ChartModule,
  UiModule,
  CardModule,
  ProgressSpinnerModule,
  ContainerComponent,
  UiModule,
];

@NgModule({ declarations, imports })
export default class DashboardModule {}
