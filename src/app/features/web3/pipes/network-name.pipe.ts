import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'networkName', standalone: true })
export class NetworkNamePipe implements PipeTransform {
  private readonly networks: Record<number, string> = {
    1: 'Ethereum Main Network',
    3: 'Ropsten Test Network',
    4: 'Rinkeby Test Network',
    5: 'Goerli Test Network',
    42: 'Kovan Test Network',
    56: 'Binance Smart Chain',
    97: 'Binance Smart Chain Testnet',
    1337: 'Ganache',
    59140: 'Linea Main Network',
    31337: 'Hardhat',
  };

  public transform(chainIdHex: string | null): string {
    const chainId: number = Number(chainIdHex);
    return this.networks[chainId] ?? '';
  }
}
