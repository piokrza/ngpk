import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [TranslateModule, ContainerComponent, ReactiveFormsModule, InputTextModule, ButtonModule];

@Component({
  selector: 'ngpk-add-item-btn',
  templateUrl: './add-item-btn.component.html',
  styleUrl: './add-item-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class AddItemBtnComponent {
  @Output() itemNameSubmit = new EventEmitter<string>();

  readonly #isEditing = signal<boolean>(false);
  readonly isEditing: Signal<boolean> = this.#isEditing.asReadonly();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly boardNameControl = new FormControl<string>('', { nonNullable: true });

  emitItemName(): void {
    if (!this.boardNameControl.value.length) return;

    this.itemNameSubmit.emit(this.boardNameControl.value);
    this.#isEditing.set(false);
    this.boardNameControl.reset();
  }

  setIsEditing(isEditing: boolean): void {
    this.#isEditing.set(isEditing);
    !isEditing && this.boardNameControl.setValue('');
  }
}
