import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, switchMap, tap } from 'rxjs';

import { CashFlow } from '#cash-flow/models';
import { CashFlowFacadeService } from '#cash-flow/services';
import { AppPaths } from '#core/enums';
import { DashobardPaths } from '#dashboard/enums';

const imports = [TranslateModule, AsyncPipe, JsonPipe];

@Component({
  selector: 'org-cash-flow-details',
  templateUrl: './cash-flow-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class CashFlowDetailsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cashFlowFacade = inject(CashFlowFacadeService);

  readonly details$: Observable<CashFlow | undefined> = this.cashFlowDetails$;

  private get cashFlowDetails$(): Observable<CashFlow | undefined> {
    return this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.cashFlowFacade.getCashFlowById$(params['id'] as string)),
      tap((cashFlow) => !cashFlow && this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.CASH_FLOW]))
    );
  }
}
