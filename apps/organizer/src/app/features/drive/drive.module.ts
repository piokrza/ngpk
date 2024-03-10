import { AsyncPipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

import { TruncatePipe } from '@ngpk/core/pipe';

import { FileListComponent, ActionButtonsComponent, DriveComponent } from '#drive/components';
import { DriveRoutingModule } from '#drive/index';
import { DriveFacadeService, DriveService } from '#drive/services';

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
