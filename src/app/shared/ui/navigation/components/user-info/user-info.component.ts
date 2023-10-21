import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '#common/models/user.model';
import { AuthSelectors } from '#store/auth';


@Component({
  selector: 'ctrl-user-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section *ngIf="user$ | async as user" class="flex gap-[1rem]">
      <img [src]="user.photoURL" alt="profile" class="rounded-full w-[4rem] h-[4rem]" />

      <div class="text-2xl font-semibold">{{ user.displayName }}</div>
    </section>
  `,
})
export class UserInfoComponent {
  public user$: Observable<User> = inject(Store).select(AuthSelectors.user);
}
