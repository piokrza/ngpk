import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '#common/models/user.model';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-user-info',
  styleUrls: ['./user-info.component.scss'],
  template: `
    <div *ngIf="user$ | async as user" class="user-info gap-4">
      <img *ngIf="user.photoURL" [src]="user.photoURL" alt="profile" class="user-info__img" />
      <div>
        <p class="user-info__name">{{ user.displayName }}</p>
        <small>{{ user.email }}</small>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  public readonly user$: Observable<User> = inject(Store).select(AuthSelectors.user);
}
