import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { FormTwo } from '#shared/components/parent-form/models';

const imports = [CommonModule, ReactiveFormsModule, InputTextModule];

@Component({
  selector: 'ctrl-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class FormTwoComponent implements OnInit {
  public readonly rootFormDirective: FormGroupDirective = inject(FormGroupDirective);

  @Input() public formGroupName!: string;

  public form!: FormGroup<FormTwo>;

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as FormGroup<FormTwo>;
  }
}
