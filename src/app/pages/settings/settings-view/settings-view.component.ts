import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '@common/models/user.model';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '@store/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent {
  private store: Store = inject(Store);

  public user$: Observable<User> = this.store.select(AuthSelectors.user);
}
