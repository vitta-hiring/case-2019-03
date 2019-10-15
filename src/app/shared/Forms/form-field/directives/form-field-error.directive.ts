import { Directive, Input } from '@angular/core';

let nextUniqueId = 0;

/** Single error message to be shown underneath the form field. */
@Directive({
  selector: 'form-field-error, [FormFieldError]',
  host: {
    'class': 'form-field-error',
    'role': 'alert',
    '[attr.id]': 'id',
  }
})

export class FormFieldErrorDirective {
  @Input() id: String = `form-field-error-${nextUniqueId++}`;
}
