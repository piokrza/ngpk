import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormOneComponent, FormTwoComponent } from '@shared/components/parent-form/components';
import { Form } from '@shared/components/parent-form/models';
import { ButtonModule } from 'primeng/button';
import { FormService } from './services/form.service';

const imports: Array<any> = [CommonModule, FormOneComponent, FormTwoComponent, ReactiveFormsModule, ButtonModule];
const providers: Array<Provider> = [FormService];

@Component({
  selector: 'ctrl-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export class ParentFormComponent {
  private formService = inject(FormService);

  public form: FormGroup<Form>;

  public constructor() {
    this.form = this.formService.buildForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.formService.markAllAsDirty(this.form);
      this.form.updateValueAndValidity();

      return;
    }

    console.log(this.form.getRawValue());
  }
}
