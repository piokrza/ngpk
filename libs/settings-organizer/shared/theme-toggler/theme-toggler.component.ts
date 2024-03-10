import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngpk-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {}
