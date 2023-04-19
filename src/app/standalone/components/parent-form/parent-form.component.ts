import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormOneComponent } from '@standalone/components/parent-form/components/form-one/form-one.component';
import { FormTwoComponent } from '@standalone/components/parent-form/components/form-two/form-two.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Form } from '@standalone/components/parent-form//models/form.model';
import { FormService } from './services/form.service';

const ParentFormImports: Array<any> = [
  CommonModule,
  FormOneComponent,
  FormTwoComponent,
  ReactiveFormsModule,
  ButtonModule,
];

@Component({
  selector: 'ctrl-parent-form',
  standalone: true,
  imports: ParentFormImports,
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentFormComponent {
  private formService = inject(FormService);

  public form: FormGroup<Form>;

  constructor() {
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
