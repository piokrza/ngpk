import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormTwo } from '@standalone/components/parent-form//models/form.model';

const FormTwoImports: Array<any> = [CommonModule, ReactiveFormsModule, InputTextModule];

@Component({
  selector: 'ctrl-form-two',
  standalone: true,
  imports: FormTwoImports,
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTwoComponent implements OnInit {
  public rootFormDirective: FormGroupDirective = inject(FormGroupDirective);

  @Input() public formGroupName!: string;

  form!: FormGroup<FormTwo>;

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as FormGroup<FormTwo>;
  }
}
