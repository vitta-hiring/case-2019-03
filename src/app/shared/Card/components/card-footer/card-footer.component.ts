import { Component } from '@angular/core';

@Component({
  selector: 'card-footer',
  template: `
    <footer class="card-footer">
      <ng-content></ng-content>
    </footer>
  `,
  styleUrls: ['./card-footer.component.scss']
})

export class CardFooterComponent {}
