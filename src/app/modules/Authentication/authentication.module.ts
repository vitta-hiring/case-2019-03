import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

import { CardModule } from '../../shared';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AuthComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    CardModule
  ],
  exports: [
    RouterModule
  ]
})

export class AuthenticationModule { }
