import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [animate('150ms ease-out', style({ opacity: 1 }))]),
  transition(':leave', [animate('150ms ease-out', style({ opacity: 0 }))]),
]);
