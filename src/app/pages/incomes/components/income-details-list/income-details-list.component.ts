import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-income-details-list',
  template: `
    <ul class="w-full">
      <li>
        <p-card>
          <ctrl-income-details> </ctrl-income-details>
        </p-card>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeDetailsListComponent {
  @Input() public list: any;
}
