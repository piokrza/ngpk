import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeFormComponent {

}
