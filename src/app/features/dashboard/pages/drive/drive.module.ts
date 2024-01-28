import { AsyncPipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

import { FileListComponent, ActionButtonsComponent } from '#drive/components';
import { DriveComponent, DriveRoutingModule } from '#drive/index';
import { DriveFacadeService, DriveService } from '#drive/services';
import { TruncatePipe } from '#shared/pipes';

const declarations = [DriveComponent, FileListComponent, ActionButtonsComponent];
const imports = [
  DriveRoutingModule,
  ButtonModule,
  FileUploadModule,
  TranslateModule,
  AsyncPipe,
  ProgressSpinnerModule,
  NgOptimizedImage,
  InputTextModule,
  ReactiveFormsModule,
  TruncatePipe,
  UpperCasePipe,
  TooltipModule,
];
const providers: Array<Provider> = [DriveFacadeService, DriveService];

@NgModule({ declarations, imports, providers, exports: [DriveComponent] })
export class DriveModule {}
