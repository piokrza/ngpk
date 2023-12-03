import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'address', standalone: true })
export class AddressPipe implements PipeTransform {
  public transform(walletAddress: string): string {
    return `${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length - 4)}`;
  }
}
