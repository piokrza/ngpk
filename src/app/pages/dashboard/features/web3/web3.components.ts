import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Web3Facade } from '#web3/data-access';

@UntilDestroy()
@Component({
  selector: 'ctrl-web3',
  template: `
    <ctrl-wallet />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Web3Component implements OnInit {
  private readonly web3Facade: Web3Facade = inject(Web3Facade);

  public ngOnInit(): void {
    this.web3Facade.onChainChange$().pipe(untilDestroyed(this)).subscribe();
    this.web3Facade.onAccountChanged$().pipe(untilDestroyed(this)).subscribe();
    this.web3Facade.checkWalletExtention$().pipe(untilDestroyed(this)).subscribe();
    this.web3Facade.requestChainIdAndAccounts$().pipe(untilDestroyed(this)).subscribe();
  }
}
