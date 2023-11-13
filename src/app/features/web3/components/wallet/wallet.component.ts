import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Web3State } from '#features/web3/data-access';

const providers: Provider[] = [Web3State];

@Component({
  selector: 'ctrl-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
})
export class WalletComponent {
  private readonly web3State: Web3State = inject(Web3State);

  public readonly account = toSignal(this.web3State.walletAddress$);
}
