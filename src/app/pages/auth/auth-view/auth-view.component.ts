import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {
  public onAuthSubmit(formValue: any): void {
    console.log(formValue);
  }
}
