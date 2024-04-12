import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

const imports = [ReactiveFormsModule, NgIf, InputTextModule];

// implement control value accessor

@Component({
  selector: 'ngpk-form-input',
  templateUrl: './form-input.component.html',
  standalone: true,
  imports,
})
export class FormInputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() inputType: string = 'text';
}
