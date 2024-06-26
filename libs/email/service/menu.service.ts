import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { MenuLinks } from '@ngpk/email/constant';

@Injectable({ providedIn: 'root' })
export class MenuService {
  setLinks(signedIn: boolean): MenuItem[] {
    return MenuLinks.filter((link) => !!link.state?.['authenticated'] === signedIn);
  }
}
