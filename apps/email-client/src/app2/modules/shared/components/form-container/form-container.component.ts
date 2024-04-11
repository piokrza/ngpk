import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent {
  @Input() title: string = '';
}
