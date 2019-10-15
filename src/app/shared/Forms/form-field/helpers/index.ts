/** @docs-private */
export function getFormFieldPlaceholderConflictError(): Error {
  return Error('Placeholder attribute and child element were both specified.');
}

/** @docs-private */
export function getFormFieldDuplicatedHintError(align: string): Error {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}

/** @docs-private */
export function getFormFieldMissingControlError(): Error {
  return Error('shared-form-field must contain a FormFieldControl.');
}
