import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressBarModule } from 'primeng/progressbar';
import { map, tap, finalize, Observable } from 'rxjs';

import { WEB3_CONFIG } from '#web3/config';
import { EthereumService, Web3State } from '#web3/data-access';
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
  private readonly web3State: Web3State = inject(Web3State);
  private readonly ethereumService: EthereumService = inject(EthereumService);

  public readonly chainId$: Observable<string | null> = this.web3State.chainId$;
  public readonly account$: Observable<string | null> = this.web3State.walletAddress$;
  public readonly isProcessing$: Observable<boolean> = this.web3State.isProcessing$;
  public readonly isMetamaskInstalled$: Observable<boolean> = this.web3State.isWalletExtention$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  protected web3Config: Web3Config = inject(WEB3_CONFIG);

  public connectWallet(): void {
    this.web3State.setIsProcessing(true);

    this.ethereumService
      .requestWallets$()
      .pipe(
        map((walletAddresses: string[]) => walletAddresses[0]),
        tap((walletAddress) => this.web3State.setWalletAddress(walletAddress)),
        finalize((): void => this.web3State.setIsProcessing(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
