import { Component } from '@angular/core';

@Component({
  selector: 'card-content',
  template: `
    <div class="card-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-content.component.scss']
})

export class CardContentComponent {}
