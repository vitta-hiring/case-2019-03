import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CardComponent,
  CardHeaderComponent,
  CardContentComponent,
  CardFooterComponent
} from './components';


@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent
  ],
})

export class CardModule { }
