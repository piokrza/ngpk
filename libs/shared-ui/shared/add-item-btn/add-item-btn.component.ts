import { ChangeDetectionStrategy, Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ContainerComponent } from '@ngpk/shared-ui/shared';

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

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly isEditing: WritableSignal<boolean> = signal<boolean>(false);
  readonly boardNameControl = new FormControl<string>('', { nonNullable: true });

  emitItemName(): void {
    if (!this.boardNameControl.value.length) return;

    this.itemNameSubmit.emit(this.boardNameControl.value);
    this.isEditing.set(false);
  }

  setIsEditing(isEditing: boolean): void {
    this.isEditing.set(isEditing);
    !isEditing && this.boardNameControl.setValue('');
  }
}
