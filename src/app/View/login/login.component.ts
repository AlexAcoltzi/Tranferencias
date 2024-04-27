import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathModel, StringConstants } from 'src/app/Constants/StringContants';
import { LoginServices } from 'src/app/Service/login-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = StringConstants.Empty;
  password: string = StringConstants.Empty;
  showErrorUsername: boolean = false;
  showErrorPassword: boolean = false;
  enableButton: boolean = false;


  constructor(
    private readonly router: Router,
    private readonly loginService: LoginServices
  ) {}

  showeSubmit(): void {
    console.log(this.username);
    if (this.username && this.password) {
      this.loginService.setLoginValue = true;
      this.router.navigate([PathModel.home]);
    };
  }

  validateUsername() {
    this.showErrorUsername = !(8 <= this.username.length && this.username.length <= 20);
  }

  validatePassword() {
    this.showErrorPassword = !(8 <= this.password.length && this.password.length <= 20);
  }

}
