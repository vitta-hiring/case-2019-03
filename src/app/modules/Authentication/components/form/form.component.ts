import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  authForm: FormGroup;

  ERROR_MESSAGE = {
    required: 'Este campo é obrigatório',
    email: 'Este e-mail é inválido'
  };

  constructor() { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
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
    console.log(this.authForm.value);
  }

}
