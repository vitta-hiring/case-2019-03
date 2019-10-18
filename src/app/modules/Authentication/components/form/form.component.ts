import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  authForm: FormGroup;

  errorMessage: string;

  ERROR_MESSAGE = {
    required: 'Este campo é obrigatório',
    email: 'Este e-mail é inválido'
  };

  constructor( private service: AuthenticationService, private router: Router ) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.authForm.valueChanges.subscribe(val => {
      this.errorMessage = undefined;
    });

  }

  hasFieldError(typeField: string) {
    if (
      this.authForm.get(typeField).getError('required') ||
      this.authForm.get(typeField).getError('email')
    ) {
      return true;
    }

    return false;
  }

  getErrorMensage(typeField: string) {
    const errors = this.authForm.get(typeField).errors;
    const value = Object.keys(errors).toString();
    if ( this.ERROR_MESSAGE[value] ) {
      return this.ERROR_MESSAGE[value];
    }
  }

  handleSubmit() {
    this.errorMessage = undefined;
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    this.service.login(email, password)
      .pipe(
        first()
      )
      .subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

  isButtonDisabled() {
    if ( this.errorMessage || !this.authForm.valid ) {
      return true;
    }
    return false;
  }

}
