import { MenuItem } from 'primeng/api';

import { MenuLinkLabel } from '@ngpk/email/enum';

export const MenuLinks: MenuItem[] = [
  {
    label: MenuLinkLabel.INBOX,
    routerLink: '/inbox',
    routerLinkActiveOptions: 'active',
    state: { authenticated: true },
  },
  {
    label: MenuLinkLabel.SIGN_OUT,
    routerLink: '/signout',
    state: { authenticated: true },
  },
  {
    label: MenuLinkLabel.SIGN_IN,
    routerLink: '/signin',
    routerLinkActiveOptions: 'active',
    state: { authenticated: false },
  },
  {
    label: MenuLinkLabel.SIGN_UP,
    routerLink: '/signup',
    routerLinkActiveOptions: 'active',
    state: { authenticated: false },
  },
];
