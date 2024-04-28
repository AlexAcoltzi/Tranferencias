import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathModel, StringConstants } from 'src/app/Constants/StringContants';
import { LoginServices } from 'src/app/Service/login-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  username: string = StringConstants.Empty;
  password: string = StringConstants.Empty;


  constructor(
    private readonly loginService: LoginServices,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm() {
    if(this.username, this.password){
      this.loginService.getLogin(this.username, this.password);
    }
  }

}
