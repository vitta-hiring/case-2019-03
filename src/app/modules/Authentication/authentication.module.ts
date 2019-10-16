import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

import { CardModule, FormFieldModule, ButtonModule } from '../../shared';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [AuthComponent, HeaderComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
    CardModule,
    FormFieldModule,
    ButtonModule
  ],
  exports: [
    RouterModule
  ]
})

export class AuthenticationModule { }
