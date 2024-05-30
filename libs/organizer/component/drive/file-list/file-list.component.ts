import { Location, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

import { TruncatePipe } from '@ngpk/core/pipe';
import { connectState } from '@ngpk/core/util';
import { IFile } from '@ngpk/organizer/model';
import { DriveFacadeService } from '@ngpk/organizer/service';

const imports = [TooltipModule, ButtonModule, UpperCasePipe, TruncatePipe, ProgressSpinnerModule, TranslateModule];

@Component({
  selector: 'ngpk-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class FileListComponent {
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  private readonly driveFacadeService = inject(DriveFacadeService);

  readonly state = connectState(this.destroyRef, {
    files: this.driveFacadeService.files$,
    isLoading: this.driveFacadeService.isLoading$,
    parentFile: this.driveFacadeService.parentFile$,
  });

  readonly nameLimit = 12;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  fileClick(file: IFile): void {
    this.driveFacadeService.fileClick(file);
  }

  navigateBack(): void {
    this.location.back();
  }
}
