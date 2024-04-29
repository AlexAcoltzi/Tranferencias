import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PathModel, StringConstants } from 'src/app/Constants/StringContants';
import { LoginServices } from 'src/app/Service/login-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup; //variable para almacenar el formulario
  username: string = StringConstants.Empty; // Variable para almacenar el nombre de usuario
  password: string = StringConstants.Empty; // Variable para almacenar la contraseña

  constructor(
    private readonly loginService: LoginServices,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //Se construye el formulario y sus vallidaciones
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validateUsername]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatePassword, this.validatePassword]]
    });
  }

  // Método para validar el nombre de usuario
validateUsername(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  // Verificar si contiene caracteres inválidos
  const invalidChars = /[^a-zA-Z0-9!\"$%&/]/.test(value);
  if (invalidChars) {
    return { 'invalidChars': true };
  }
  return null;
}

  // Método para validar la contraseña
  validatePassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    // Verificar si contiene al menos una letra minúscula, una letra mayúscula, no permite secuencias de números, y al menos un caracter especial
    const containsLowercase = /[a-z]/.test(password);
    const containsUppercase = /[A-Z]/.test(password);
    const noSequentialNumbers = !/(012|123|234|345|456|567|678|789)/.test(password);
    const containsSpecialChar = /[!\"$%&/]/.test(password);
    // Verificar si todas las condiciones se cumplen
    if (!containsLowercase || !containsUppercase || !noSequentialNumbers || !containsSpecialChar) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  submitForm() {
    if(this.loginForm.valid){ // verificamos si el formulario es valido
      this.loginService.getLogin(this.username, this.password); // Se lllama al servicio para iniciar sesión
    }
  }
}
