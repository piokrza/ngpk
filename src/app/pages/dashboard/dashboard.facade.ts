import { Injectable, NgZone, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, forkJoin, tap, debounceTime, combineLatest, filter } from 'rxjs';

import { ToastService } from '#common/services';
import { TargetNetworkDialogComponent } from '#features/web3/components';
import { WEB3_CONFIG } from '#features/web3/config';
import { Web3State, EthereumService } from '#features/web3/data-access';
import { Web3Config } from '#features/web3/models';
import { AuthService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';
import { TaskerActions } from '#store/tasker';

@Injectable()
export class DashboardFacade {
  private readonly store: Store = inject(Store);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly web3State: Web3State = inject(Web3State);
  private readonly web3Config: Web3Config = inject(WEB3_CONFIG);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly ethereumService: EthereumService = inject(EthereumService);

  public initializeUserData$() {
    return this.authService.authState$.pipe(
      tap((user: firebase.User | null) => {
        if (user) {
          this.store.dispatch(CategoriesActions.getCategories());
          this.store.dispatch(AuthActions.loadUserData());
          this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid: user.uid }));
          this.store.dispatch(TaskerActions.getTaskerUserData({ uid: user.uid }));
        }
      })
    );
  }

  public requestChainIdAndAccounts$(): Observable<{ chainId: string; accounts: string[] }> {
    return forkJoin({
      chainId: this.ethereumService.requestChainId$(),
      accounts: this.ethereumService.requestAccounts$(),
    }).pipe(
      tap(({ chainId, accounts }) => {
        this.web3State.setChainId(chainId);
        this.web3State.setWalletAddress(accounts[0] ?? null);
      })
    );
  }

  public checkWalletExtention$(): Observable<boolean> {
    return this.web3State.isWalletExtention$.pipe(
      debounceTime(0),
      tap((isWalletExtention: boolean) => !isWalletExtention && this.toastService.showMessage('error', 'Wallet not detected', ''))
    );
  }

  public onAccountChanged$(): Observable<string[]> {
    return this.ethereumService
      .accountChanged$()
      .pipe(tap((accountAddresses: string[]) => this.ngZone.run((): void => this.web3State.setWalletAddress(accountAddresses[0] ?? null))));
  }

  public onChainChange$(): Observable<{ currentChainId: string | null; updatedChainId: string }> {
    return combineLatest({
      currentChainId: this.web3State.chainId$,
      updatedChainId: this.ethereumService.chainChanged$(),
    }).pipe(
      filter(({ currentChainId, updatedChainId }) => currentChainId !== updatedChainId),
      tap(({ updatedChainId }) => this.ngZone.run(() => this.web3State.setChainId(updatedChainId)))
    );
  }

  public checkNetworks$(): Observable<string> {
    return this.web3State.chainId$.pipe(
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
}
