import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';
import { DashboardViewComponent } from '@dashboard/dashboard-view/dashboard-view.component';
import { UiModule } from '@features/ui/ui.module';
import { ContainerComponent } from '@shared/components/container/container.component';

// PrimeNg
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const declarations: Array<any> = [DashboardViewComponent];
const imports: Array<any> = [
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
