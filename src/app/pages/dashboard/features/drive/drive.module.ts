import { NgModule, Provider } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

import { DriveComponent, DriveRoutingModule } from '#drive/.';
import { DriveApi, DriveFacade, DriveState } from '#drive/data-access';

const declarations = [DriveComponent];
const imports = [DriveRoutingModule, ButtonModule, FileUploadModule];
const providers: Array<Provider> = [DriveState, DriveFacade, DriveApi];

@NgModule({ declarations, imports, providers, exports: [DriveComponent] })
export default class DriveModule {}
