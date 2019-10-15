import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ContentChildren,
  AfterViewInit,
  QueryList,
  ViewChild,
  ElementRef,
  ContentChild,
  OnDestroy,
  ChangeDetectorRef,
  Optional,
  NgZone,
  AfterContentInit
} from '@angular/core';

import {
  FormFieldPrefixDirective,
  FormFieldSuffixDirective,
  FormFieldHintDirective,
  FormFieldErrorDirective,
  FormFieldLabelDirective
} from '../../directives';

import {
  FormFieldControl
} from '../../class';

import {
  getFormFieldDuplicatedHintError
} from '../../helpers';

import {
  FormFieldAnimations
} from '../../consts';

import { NgControl } from '@angular/forms';
import { Subject, merge } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { startWith, takeUntil } from 'rxjs/operators';

let nextUniqueId = 0;

class FormFieldBase {
  constructor(public _elementRef: ElementRef) { }
}

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FormFieldAnimations.transitionMessages],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'shared-form-field',
    '[class.shared-form-field-with-border]': 'hasBorder',
    '[class.shared-form-field-focused]': '_control.focused',
    '[class.shared-form-field-invalid]': '_control.errorState',
    '[class.shared-form-field-disabled]': '_control.disabled',
    '[class.shared-form-field-autofilled]': '_control.autofilled',
    '[class.shared-form-field-empty]': '_control.empty',
    '[class.shared-form-field-valid]': '_shouldMarkerValidStatus()',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
  }
})

export class FormFieldComponent extends FormFieldBase implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  // Unique id for the hint label.
  _hintLabelId: String = `form-field-hint-${nextUniqueId++}`;

  // Unique id for the internal form field label.
  _labelId: String = `form-field-label-${nextUniqueId++}`;

  footerWrapperStyle = {
    'padding-left.px': '0',
    'padding-right.px': '0'
  };

  _subscriptAnimationState: String = '';

  private _destroyed = new Subject<void>();

  @Input()
  get hasBorder() {
    return this._hasBorder;
  }
  set hasBorder(val: Boolean) {
    this._hasBorder = coerceBooleanProperty(val);
  }
  protected _hasBorder;

  @Input()
  get hideRequiredMarker(): boolean { return this._hideRequiredMarker; }
  set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  private _hideRequiredMarker: boolean;

  @Input()
  get showValidStatus(): Boolean { return this._showValidStatus; }
  set showValidStatus( value: Boolean ) {
    this._showValidStatus = coerceBooleanProperty(value);
  }
  private _showValidStatus: Boolean;

  @ViewChild('connectionContainer', { static: false}) _connectionContainerRef: ElementRef;
  @ViewChild('inputContainer', { static: false}) _inputContainerRef: ElementRef;
  @ViewChild('label', { static: false}) private _label: ElementRef;

  @ViewChild('asidePrefix', { static: false}) _asidePrefix: ElementRef;
  @ViewChild('asideSuffix', { static: false}) _asideSuffix: ElementRef;
  @ContentChild(FormFieldLabelDirective, { static: false}) _labelChild: FormFieldLabelDirective;
  @ContentChildren(FormFieldPrefixDirective) _prefixChildren: QueryList<FormFieldPrefixDirective>;
  @ContentChildren(FormFieldSuffixDirective) _suffixChildren: QueryList<FormFieldSuffixDirective>;
  @ContentChildren(FormFieldHintDirective) _hintChildren: QueryList<FormFieldHintDirective>;
  @ContentChildren(FormFieldErrorDirective) _errorChildren: QueryList<FormFieldErrorDirective>;

  @ContentChild(FormFieldControl, { static: false}) _control: FormFieldControl<any>;

  constructor(
    public _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _dir: Directionality,
    private _platform: Platform,
    private _ngZone: NgZone,
  ) {
    super(_elementRef);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this._subscriptAnimationState = 'enter';
    this._changeDetectorRef.detectChanges();
  }

  ngAfterContentInit() {
    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`mat-form-field-type-${control.controlType}`);
    }

    control.stateChanges.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });

    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    if (this._dir) {
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {});
    }

  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  _shouldMarkerValidStatus() {
    if ( this.showValidStatus && this._shouldForward('valid') ) {
      return true;
    }
    return false;
  }

  /** Determines whether a class from the NgControl should be forwarded to the host element. */
  _shouldForward(prop: keyof NgControl): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  _hasLabel() {
    return this._labelChild ? true : false;
  }
  _showPrefix() {
    return this._prefixChildren.length > 0;
  }
  _showSuffix() {
    return this._suffixChildren.length > 0;
  }
  _showHint() {
    return this._hintChildren.length > 0;
  }
  _showError() {
    return this._errorChildren.length > 0;
  }

  _getFooterPaddingLeft() {
    if (this._asidePrefix && this._asidePrefix.nativeElement) {
      return this._asidePrefix.nativeElement.offsetWidth;
    }
    return 0;
  }
  _getFooterPaddingRight() {
    if (this._asideSuffix && this._asideSuffix.nativeElement) {
      return this._asideSuffix.nativeElement.offsetWidth;
    }
    return 0;
  }

  _getDisplayedMessages(): 'error' | 'hint' {
    return (this._errorChildren && this._errorChildren.length > 0 &&
        this._control.errorState) ? 'error' : 'hint';
  }

  private _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }

  private _validateHints() {
    if (this._hintChildren) {
      let startHint: FormFieldHintDirective;
      let endHint: FormFieldHintDirective;
      this._hintChildren.forEach((hint: FormFieldHintDirective) => {
        if (hint.align === 'start') {
          if (startHint) {
            throw getFormFieldDuplicatedHintError('start');
          }
          startHint = hint;
        } else if (hint.align === 'end') {
          if (endHint) {
            throw getFormFieldDuplicatedHintError('end');
          }
          endHint = hint;
        }
      });
    }
  }

  private _syncDescribedByIds() {
    if (this._control) {
      let ids: String[] = [];

      if (this._getDisplayedMessages() === 'hint') {
        const startHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'start') : null;
        const endHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'end') : null;

        if (startHint) {
          ids.push(startHint.id);
        }

        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids = this._errorChildren.map(error => error.id);
      }

      this._control.setDescribedByIds(ids);
    }
  }

}
