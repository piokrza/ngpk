import { AsyncPipe } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DriveComponent, DriveRoutingModule } from '#drive/.';
import { DriveApi, DriveFacade, DriveState } from '#drive/data-access';

const declarations = [DriveComponent];
const imports = [DriveRoutingModule, ButtonModule, FileUploadModule, TranslateModule, AsyncPipe, ProgressSpinnerModule];
const providers: Array<Provider> = [DriveState, DriveFacade, DriveApi];

@NgModule({ declarations, imports, providers, exports: [DriveComponent] })
export default class DriveModule {}
