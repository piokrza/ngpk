import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'org-details-box',
  styleUrl: './details-box.component.scss',
  template: `
    <div class="gap-2 box">
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
