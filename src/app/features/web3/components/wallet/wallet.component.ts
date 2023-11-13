import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressBarModule } from 'primeng/progressbar';
import { map, tap, finalize } from 'rxjs';

import { WEB3_CONFIG } from '#features/web3/config';
import { MetamaskService, Web3State } from '#features/web3/data-access';
import { Web3Config } from '#features/web3/models';
import { AddressPipe } from '#features/web3/pipes';

const imports = [AsyncPipe, TranslateModule, ProgressBarModule, ButtonModule, AddressPipe, ConfirmPopupModule];

@UntilDestroy()
@Component({
  selector: 'ctrl-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class WalletComponent {
  private readonly web3State: Web3State = inject(Web3State);
  private readonly translate: TranslateService = inject(TranslateService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly metamaskService: MetamaskService = inject(MetamaskService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public readonly chainId = toSignal(this.web3State.chainId$);
  public readonly account = toSignal(this.web3State.walletAddress$);
  public readonly isProcessing = toSignal(this.web3State.isProcessing$);
  public readonly isMetamaskInstalled = toSignal(this.web3State.isWalletExtention$);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  protected web3Config: Web3Config = inject(WEB3_CONFIG);

  public connectWallet(): void {
    if (this.account() === null) {
      this.web3State.setIsProcessing(true);

      this.metamaskService
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

  public logout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant(''),
      icon: this.PrimeIcons.EXCLAMATION_TRIANGLE,
      accept: () => {}, // TODO: handle wallet disconnect
    });
  }
}
