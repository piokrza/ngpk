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
import { DriveRoutingModule } from '@ngpk/organizer/feature/drive';
import { DriveFacadeService, DriveService } from '@ngpk/organizer/service';
import { FileListComponent, ActionButtonsComponent, DriveComponent } from '@ngpk/organizer/shared';

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
