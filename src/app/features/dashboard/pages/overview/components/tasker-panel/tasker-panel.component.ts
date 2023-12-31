import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { TaskerData } from '#overview/models';
import { ContainerComponent } from '#shared/components';

const imports = [ContainerComponent, TranslateModule, ButtonModule];

@Component({
  selector: 'org-tasker-panel',
  templateUrl: './tasker-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class TaskerPanelComponent {
  @Input({ required: true }) taskerData: TaskerData | null = null;

  @Output() quickNote = new EventEmitter<void>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
