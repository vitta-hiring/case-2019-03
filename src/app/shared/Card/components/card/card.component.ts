import { Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'shared-card',
  template: `
    <section class="shared-card">
      <ng-content></ng-content>
    </section>
  `,
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CardComponent {

  @Input() class = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class
    ].join(' ');
  }

}
