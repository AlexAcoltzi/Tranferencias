import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';
import { PathModel, PathRequest } from '../Constants/StringContants';
import { LoginResponse } from '../Models/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userData: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>({
    idUsuario: 1, nombre: 'Alex Acoltzi'
  })

  constructor( 
    private readonly httpClient: HttpClient,
    private readonly router: Router
   ) { }

  get getLoginValue(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  set setLoginValue(newLoginValue: boolean) {
    this.isLogin.next(newLoginValue);
  }

  get getUserData(){
    return this.userData.value;
  }

  set setUserData(newUserData: LoginResponse){
    this.userData.next(newUserData);
  }

  getLogin(username: string, password: string){
      const login: LoginRequest = new LoginRequest(username, password);
      this.httpClient.post<LoginResponse>(PathRequest.login, login).subscribe((response) => {
        this.setUserData = response;
        this.setLoginValue = true;
        this.router.navigate([PathModel.home])
      }, 
    (error) => {
      alert(error.error);
    });
  }
}
