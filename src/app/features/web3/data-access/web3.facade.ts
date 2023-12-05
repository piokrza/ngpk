import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, forkJoin, tap, debounceTime, combineLatest, filter } from 'rxjs';

import { AppPaths } from '#common/enums';
import { ToastService } from '#common/services';
import { TargetNetworkDialogComponent } from '#web3/components';
import { WEB3_CONFIG } from '#web3/config';
import { MetamaskState, MetamaskService } from '#web3/data-access';
import { Web3Config } from '#web3/models';

@Injectable()
export class Web3Facade {
  private readonly router: Router = inject(Router);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly web3Config: Web3Config = inject(WEB3_CONFIG);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly metamaskState: MetamaskState = inject(MetamaskState);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly metamaskService: MetamaskService = inject(MetamaskService);

  public requestChainIdAndAccounts$(): Observable<{ chainId: string; accounts: string[] }> {
    return forkJoin({
      chainId: this.metamaskService.requestChainId$(),
      accounts: this.metamaskService.requestAccounts$(),
    }).pipe(
      tap(({ chainId, accounts }) => {
        this.metamaskState.setChainId(chainId);
        this.metamaskState.setWalletAddress(accounts[0] ?? null);
      })
    );
  }

  public checkWalletExtention$(): Observable<boolean> {
    return this.metamaskState.isWalletExtention$.pipe(
      debounceTime(0),
      tap((isWalletExtention: boolean) => {
        !isWalletExtention && this.toastService.showMessage('error', 'Wallet not detected', '');
      })
    );
  }

  public onAccountChanged$(): Observable<string[]> {
    return this.metamaskService.accountChanged$().pipe(
      tap((accountAddresses: string[]) => {
        this.metamaskState.setWalletAddress(accountAddresses[0] ?? null);
      })
    );
  }

  public onChainChange$(): Observable<{ currentChainId: string | null; updatedChainId: string }> {
    return combineLatest({
      currentChainId: this.metamaskState.chainId$,
      updatedChainId: this.metamaskService.chainChanged$(),
    }).pipe(
      filter(({ currentChainId, updatedChainId }) => currentChainId !== updatedChainId),
      tap(({ updatedChainId }) => {
        this.ngZone.run(() => this.metamaskState.setChainId(updatedChainId));
      })
    );
  }

  public checkNetworks$(): Observable<string> {
    return this.metamaskState.chainId$.pipe(
      filter(Boolean),
      tap((chainId: string) => {
        chainId;
        Number(chainId) !== this.web3Config.targetNetworkId &&
          this.dialogService.open(TargetNetworkDialogComponent, {
            header: 'Check your network',
            closable: false,
          });
      })
    );
  }

  public navigateToDashboard(): void {
    this.router.navigate([AppPaths.DASHBOARD]);
  }
}
