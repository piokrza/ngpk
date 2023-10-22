import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '#common/models/user.model';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-user-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-info.component.scss'],
  template: `
    <section *ngIf="user$ | async as user" class="user-info gap-4">
      <img *ngIf="user.photoURL" [src]="user.photoURL" alt="profile" class="user-info__img" />
      <div class="user-info__name">{{ user.displayName }}</div>
    </section>
  `,
})
export class UserInfoComponent {
  public user$: Observable<User> = inject(Store).select(AuthSelectors.user);
}
