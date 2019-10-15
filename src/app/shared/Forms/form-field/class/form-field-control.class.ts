import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';

export abstract class FormFieldControl<T> {

  /** The value of the control. */
  value: T | null;

  /**
   * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
   * needs to run change detection.
   */
  readonly stateChanges: Observable<void>;

  /** The element ID for this control. */
  readonly id: String;

  /** The placeholder for this control. */
  readonly placeholder: String;

  /** Gets the NgControl for this control. */
  readonly ngControl: NgControl | null;

  /** Whether the control is focused. */
  readonly focused: Boolean;

  /** Whether the control is empty. */
  readonly empty: Boolean;

  /** Whether the control is required. */
  readonly required: Boolean;

  /** Whether the control is disabled. */
  readonly disabled: Boolean;

  /** Whether the control is in an error state. */
  readonly errorState: Boolean;

  /**
   * An optional name for the control type that can be used to distinguish `mat-form-field` elements
   * based on their control type. The form field will add a class,
   * `mat-form-field-type-{{controlType}}` to its root element.
   */
  readonly controlType?: String;

  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  readonly autofilled?: Boolean;

  /** Sets the list of element IDs that currently describe this control. */
  abstract setDescribedByIds(ids: String[]): void;

  /** Handles a click on the control's container. */
  abstract onContainerClick(event: MouseEvent): void;

}
