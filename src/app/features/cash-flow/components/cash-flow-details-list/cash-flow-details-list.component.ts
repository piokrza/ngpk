import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';

@Component({
  selector: 'ctrl-cash-flow-details-list',
  template: `
    <ng-container *ngIf="cashFlowList.length">
      <ul class="w-full flex flex-col gap-6">
        <li *ngFor="let detailsItem of cashFlowList">
          <p-card>
            <ctrl-cash-flow-details [details]="detailsItem" />
          </p-card>
        </li>
      </ul>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsListComponent {
  @Input() public cashFlowList!: CashFlow[];
}
