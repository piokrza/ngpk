import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-board',
  template: `<h1>Board działa</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BoardComponent {}
