import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule, DashboardComponent } from '#dashboard/.';
import { DashboardFacade } from '#dashboard/data-access';
import { LayoutModule } from '#layout/.';
import { ContainerComponent } from '#shared/components';

const declarations = [DashboardComponent];
const imports = [CommonModule, DashboardRoutingModule, ChartModule, LayoutModule, CardModule, ProgressSpinnerModule, ContainerComponent];
const providers: Provider[] = [DashboardFacade];

@NgModule({ declarations, imports, providers })
export default class DashboardModule {}
