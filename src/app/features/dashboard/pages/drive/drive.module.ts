import { AsyncPipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DriveComponent, DriveRoutingModule } from '#drive/.';
import { FileListComponent } from '#drive/components/file-list';
import { DriveFacade, DriveService } from '#drive/data-access';
import { TruncatePipe } from '#shared/pipes';

const declarations = [DriveComponent, FileListComponent];
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
];
const providers: Array<Provider> = [DriveFacade, DriveService];

@NgModule({ declarations, imports, providers, exports: [DriveComponent] })
export default class DriveModule {}
