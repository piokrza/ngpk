import { InjectionToken } from '@angular/core';

import { Web3Config } from '#web3/models';

export const WEB3_CONFIG = new InjectionToken<Web3Config>('WEB3_CONFIG');

export const web3Config: Web3Config = Object.freeze({
  targetNetworkId: 31337,
  targetNetworkName: 'Hardhat',
  targetNetworkCurrency: 'ETH',
  targetNetworkRpcUrl: 'http://127.0.0.1:8545/',
  metamaskInstallHref: 'https://metamask.io/download/',
});
