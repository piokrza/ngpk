import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { switchMap, map, tap } from 'rxjs';

import { WEB3_CONFIG } from '#web3/config';
import { MetamaskService, MetamaskState } from '#web3/data-access';
import { Web3Config } from '#web3/models';

const imports = [ToolbarModule, ButtonModule, AsyncPipe];

@UntilDestroy()
@Component({
  selector: 'ctrl-target-network-dialog',
  templateUrl: './target-network-dialog.component.html',
  styleUrl: './target-network-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class TargetNetworkDialogComponent {
  private readonly metamaskState: MetamaskState = inject(MetamaskState);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly metamaskService: MetamaskService = inject(MetamaskService);

  public isProcessing = false;
  public readonly config: Web3Config = inject(WEB3_CONFIG);
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public switchNetworkClick(): void {
    this.isProcessing = true;

    this.metamaskService
      .switchToTargetNetwork$()
      .pipe(
        switchMap(() => this.metamaskState.chainId$.pipe(map((chainId) => Number(chainId) === this.config.targetNetworkId))),
        tap((matched: boolean) => matched && this.dialogRef.close()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
