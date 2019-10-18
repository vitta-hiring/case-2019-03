import { Component, Input } from '@angular/core';

/**
 * Possible type of button.
 */
export type ButtonPossibleType = 'button' | 'reset' | 'menu' | 'submit';

/**
 * Possible Button Size
 */
export type ButtonPossibleSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {

  @Input() type: ButtonPossibleType = 'button';
  @Input() size: ButtonPossibleSize = 'medium';
  @Input() isDisabled = false;
  @Input() isFullSize = false;
  @Input() isOutline = false;

  handleButtonSize(size: ButtonPossibleSize) {
    if (this.size === size) {
      return true;
    }
    return false;
  }

}
