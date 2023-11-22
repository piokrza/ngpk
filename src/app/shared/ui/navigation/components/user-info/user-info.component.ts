import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '#auth/models';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-user-info',
  styleUrl: './user-info.component.scss',
  templateUrl: './user-info.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  public readonly user$: Observable<User | null> = inject(Store).select(AuthSelectors.user);
}
