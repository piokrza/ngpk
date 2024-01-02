import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'org-details-box',
  template: `
    <div class="flex align-items-center gap-2">
      <i [class]="'mr-1 pi pi-' + iconName"></i>
      <span>{{ detail }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsBoxComponent {
  @Input({ required: true }) public detail!: string;
  @Input({ required: true }) public iconName!: string;
}
