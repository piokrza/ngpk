import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class Web3State {
  private readonly walletAddress$$ = new BehaviorSubject<string | null>(null);
  private readonly isProcessing$$ = new BehaviorSubject<boolean>(false);
  private readonly chainId$$ = new BehaviorSubject<string | null>(null);
  private readonly isWalletExtention$$ = new BehaviorSubject<boolean>(!(window.ethereum === undefined));

  public get isWalletExtention$(): Observable<boolean> {
    return this.isWalletExtention$$.asObservable();
  }

  public setWalletAddress(walletAddress: string): void {
    this.walletAddress$$.next(walletAddress);
  }

  public get walletAddress$(): Observable<string | null> {
    return this.walletAddress$$.asObservable();
  }

  public setChainId(chainId: string | null): void {
    this.chainId$$.next(chainId);
  }

  public get chainId$(): Observable<string | null> {
    return this.chainId$$.asObservable();
  }

  public setIsProcessing(isProcessing: boolean): void {
    this.isProcessing$$.next(isProcessing);
  }

  public get isProcessing$(): Observable<boolean> {
    return this.isProcessing$$.asObservable();
  }
}
