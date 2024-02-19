import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-browser',
  templateUrl: './browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrowserComponent {}
