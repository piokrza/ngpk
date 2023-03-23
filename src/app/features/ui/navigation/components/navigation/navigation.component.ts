import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}
