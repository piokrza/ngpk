import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { FormOne } from '#shared/components/parent-form/models';

const imports: Array<any> = [CommonModule, ReactiveFormsModule, InputTextModule];

@Component({
  selector: 'ctrl-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class FormOneComponent implements OnInit {
  public readonly rootFormDirective = inject(FormGroupDirective);

  @Input() public formGroupName!: string;

  public form!: FormGroup<FormOne>;

  public ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as FormGroup<FormOne>;
  }
}
