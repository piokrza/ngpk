import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardFacade, DashboardRoutingModule, DashboardComponent } from '#dashboard/.';
import { ContainerComponent } from '#shared/components';
import { UiModule } from '#shared/ui';

const declarations = [DashboardComponent];
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
const providers: Provider[] = [DashboardFacade];

@NgModule({ declarations, imports, providers })
export default class DashboardModule {}
