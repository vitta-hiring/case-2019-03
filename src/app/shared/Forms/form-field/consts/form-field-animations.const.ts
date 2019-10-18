import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const FormFieldAnimations: {
  readonly transitionMessages: AnimationTriggerMetadata
} = {
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: trigger('transitionMessages', [
    // TODO(mmalerba): Use angular animations for label animation as well.
    state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
    transition('void => enter', [
      style({ opacity: 0, transform: 'translateY(-100%)' }),
      animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
    ]),
  ])
};
