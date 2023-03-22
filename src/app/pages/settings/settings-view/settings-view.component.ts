import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '@common/services/theme.service';

@Component({
  selector: 'ctrl-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent implements OnInit {
  public themeService: ThemeService = inject(ThemeService);

  public isLightMode: boolean = this.themeService.isLightMode;

  public ngOnInit(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
