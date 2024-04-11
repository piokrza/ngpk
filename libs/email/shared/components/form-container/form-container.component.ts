import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngpk-form-container',
  template: `
    <div class="container-max-w-sm">
      <div class="px-4 py-3 mt-5">
        <h1>{{ title }}</h1>
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormContainerComponent {
  @Input() title: string = '';
}
