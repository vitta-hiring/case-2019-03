import { Directive, Input } from '@angular/core';

let nextUniqueId = 0;

/** Single error message to be shown underneath the form field. */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form-field-error,   [FormFieldError]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'form-field-error',
    role: 'alert',
    '[attr.id]': 'id',
  }
})

export class FormFieldErrorDirective {
  @Input() id = `form-field-error-${nextUniqueId++}`;
}
