import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-income-details-list',
  template: `
    <ul class="w-full flex flex-col gap-6">
      <li>
        <p-card>
          <ctrl-income-details />
        </p-card>
      </li>

      <li>
        <p-card>
          <ctrl-income-details />
        </p-card>
      </li>

      <li>
        <p-card>
          <ctrl-income-details />
        </p-card>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeDetailsListComponent {
  @Input() public list: any;
}
