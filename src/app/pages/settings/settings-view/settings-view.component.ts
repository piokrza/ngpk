import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsViewComponent {

}
