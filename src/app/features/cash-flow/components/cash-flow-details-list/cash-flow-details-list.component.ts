import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';

@Component({
  selector: 'ctrl-cash-flow-details-list',
  template: `
    <ng-container *ngIf="cashFlowList.length">
      <p-dataView [value]="cashFlowList" [paginator]="true" [rows]="3">
        <ng-template let-detailsItem pTemplate="listItem">
          <p-card>
            <ctrl-cash-flow-details [details]="detailsItem" />
          </p-card>
        </ng-template>
      </p-dataView>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsListComponent {
  @Input() public cashFlowList!: CashFlow[];
}
