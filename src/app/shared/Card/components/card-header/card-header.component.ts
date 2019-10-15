import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-header',
  template: `
    <header class="card-header">
      <ng-content></ng-content>
    </header>
  `,
  styleUrls: ['./card-header.component.scss']
})

export class CardHeaderComponent {}
