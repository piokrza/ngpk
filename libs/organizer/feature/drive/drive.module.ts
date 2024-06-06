import { NgModule, Provider } from '@angular/core';

import { DriveRoutingModule } from '@ngpk/organizer/feature/drive';
import { DriveFacadeService, DriveService } from '@ngpk/organizer/service/drive';

const imports = [DriveRoutingModule];
const providers: Array<Provider> = [DriveFacadeService, DriveService];

@NgModule({ imports, providers })
export class DriveModule {}
