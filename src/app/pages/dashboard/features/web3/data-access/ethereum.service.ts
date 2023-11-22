import { Injectable, inject } from '@angular/core';
import { Observable, filter, switchMap, fromEvent, from } from 'rxjs';

import { Web3State } from '#dashboard/features/web3/data-access';
import { WEB3_CONFIG } from '#web3/config';
import { EthereumEvent } from '#web3/enums';
import { Ethereum, Web3Config } from '#web3/models';

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

@Injectable({ providedIn: 'root' })
export class EthereumService {
  private readonly web3State: Web3State = inject(Web3State);
  private readonly web3Config: Web3Config = inject(WEB3_CONFIG);

  public requestWallets$(): Observable<string[]> {
    return this.request$<string[]>(EthereumEvent.ETH_REQUEST_ACCOUNTS);
  }

  public requestAccounts$(): Observable<string[]> {
    return this.request$<string[]>(EthereumEvent.ETH_ACCOUNTS);
  }

  public requestChainId$(): Observable<string> {
    return this.request$<string>(EthereumEvent.ETH_CHAIN_ID);
  }

  public accountChanged$(): Observable<string[]> {
    return this.web3State.isWalletExtention$.pipe(
      filter(Boolean),
      switchMap(() => fromEvent(<any>window.ethereum, EthereumEvent.ACCOUNTS_CHANGED) as Observable<string[]>)
    );
  }

  public chainChanged$(): Observable<string> {
    return fromEvent(<any>window.ethereum, EthereumEvent.CHAIN_CHANGED);
  }

  public switchToTargetNetwork$(): Observable<void> {
    return this.request$<void>(EthereumEvent.WALLET_ADD_ETHEREUM_CHAIN, [
      {
        chainId: `0x${this.web3Config.targetNetworkId.toString(16)}`,
        chainName: this.web3Config.targetNetworkName,
        rpcUrls: [this.web3Config.targetNetworkRpcUrl],
        nativeCurrency: {
          decimals: 18,
          name: this.web3Config.targetNetworkCurrency,
          symbol: this.web3Config.targetNetworkCurrency,
        },
      },
    ]);
  }

  private request$<T>(event: EthereumEvent, params = {}): Observable<T> {
    return from(window.ethereum.request({ method: event, params: params }));
  }
}
