import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressBarModule } from 'primeng/progressbar';
import { Observable, finalize, map, tap } from 'rxjs';

import { WEB3_CONFIG } from '#web3/config';
import { MetamaskService, MetamaskState } from '#web3/data-access';
import { Web3Config } from '#web3/models';
import { AddressPipe, NetworkNamePipe } from '#web3/pipes';

const imports = [TranslateModule, ProgressBarModule, ButtonModule, AddressPipe, ConfirmPopupModule, NetworkNamePipe, AsyncPipe];

@UntilDestroy()
@Component({
  selector: 'ctrl-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class WalletComponent {
  private readonly metamaskState: MetamaskState = inject(MetamaskState);
  private readonly metamaskService: MetamaskService = inject(MetamaskService);

  protected web3Config: Web3Config = inject(WEB3_CONFIG);

  public readonly chainId$: Observable<string | null> = this.metamaskState.chainId$;
  public readonly isProcessing$: Observable<boolean> = this.metamaskState.isProcessing$;
  public readonly account$: Observable<string | null> = this.metamaskState.walletAddress$;
  public readonly isMetamaskInstalled$: Observable<boolean> = this.metamaskState.isWalletExtention$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public connectWallet(): void {
    this.metamaskState.setIsProcessing(true);

    this.metamaskService
      .requestWallets$()
      .pipe(
        map((walletAddresses: string[]) => walletAddresses[0]),
        tap((walletAddress) => this.metamaskState.setWalletAddress(walletAddress)),
        finalize((): void => this.metamaskState.setIsProcessing(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
