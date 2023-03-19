import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-user-info',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex gap-[1rem]">
      <img src="" alt="profile" class="rounded-full w-[4rem] h-[4rem] bg-slate-600" />

      <div class="flex flex-col justify-center">
        <div class="text-2xl font-semibold">Mike</div>
        <div>Your Money</div>
      </div>
    </section>
  `,
})
export class UserInfoComponent {}
