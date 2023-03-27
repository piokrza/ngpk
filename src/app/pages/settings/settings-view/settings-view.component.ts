import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { isLightMode } from '@common/constants/is-light-mode';
import { PersistanceService } from '@common/services/persistance.service';
import { ThemeService } from '@common/services/theme.service';

@Component({
  selector: 'ctrl-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent implements OnInit {
  public themeService: ThemeService = inject(ThemeService);

  public isLightMode: boolean = inject(PersistanceService).get(isLightMode);

  public ngOnInit(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
