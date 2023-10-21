import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormTwo } from '@shared/components/parent-form//models/form.model';
import { InputTextModule } from 'primeng/inputtext';

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
  public readonly rootFormDirective: FormGroupDirective = inject(FormGroupDirective);

  @Input() public formGroupName!: string;

  public form!: FormGroup<FormTwo>;

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as FormGroup<FormTwo>;
  }
}
