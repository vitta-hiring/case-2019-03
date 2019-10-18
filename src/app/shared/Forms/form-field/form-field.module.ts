import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormFieldComponent
} from './components';

import {
  FormFieldInputDirective,
  FormFieldPrefixDirective,
  FormFieldSuffixDirective,
  FormFieldHintDirective,
  FormFieldErrorDirective,
  FormFieldLabelDirective
} from './directives';
import { Browser } from 'protractor';

@NgModule({
  declarations: [
    FormFieldComponent,
    FormFieldInputDirective,
    FormFieldPrefixDirective,
    FormFieldSuffixDirective,
    FormFieldHintDirective,
    FormFieldErrorDirective,
    FormFieldLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldComponent,
    FormFieldInputDirective,
    FormFieldPrefixDirective,
    FormFieldSuffixDirective,
    FormFieldHintDirective,
    FormFieldErrorDirective,
    FormFieldLabelDirective
  ]
})

export class FormFieldModule { }
