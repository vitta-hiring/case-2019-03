import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthComponent } from './pages/auth/auth.component';

import { CardModule, FormFieldModule, ButtonModule } from '../../shared';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

import { AuthenticationService } from './services/auth.service';
import { fakeBackendProvider } from '../../interceptors/fake-backend.interceptor';
@NgModule({
  declarations: [AuthComponent, HeaderComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  ],
  providers: [
    fakeBackendProvider,
    AuthenticationService
  ]
})

export class AuthenticationModule { }
