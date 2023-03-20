import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-details-list',
  template: `
    <ul class="w-full flex flex-col gap-6">
      <li>
        <p-card>
          <ctrl-cash-flow-details />
        </p-card>
      </li>

      <li>
        <p-card>
          <ctrl-cash-flow-details />
        </p-card>
      </li>

      <li>
        <p-card>
          <ctrl-cash-flow-details />
        </p-card>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsListComponent {}
