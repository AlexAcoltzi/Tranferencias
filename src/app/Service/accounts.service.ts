import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetAccountsResponse } from '../Models/GetAccountsResponse';
import { GetAccountsRequest } from '../Models/GetAccountsRequest';
import { LoginServices } from './login-services.service';
import { HttpClient } from '@angular/common/http';
import { PathRequest } from '../Constants/StringContants';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private userAccounts: BehaviorSubject<Array<GetAccountsResponse>> = new BehaviorSubject<Array<GetAccountsResponse>>([
    {
      idCuenta: 100, idUsuario: 1, tipoCuenta: 'Fondo de ahorro', saldo: 1000,
    },
    {
      idCuenta: 101, idUsuario: 1, tipoCuenta: 'Cuenta de ahorro', saldo: 1000,
    }
  ])

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loginService: LoginServices
  ) { }

  get getUserAccounts() {
    return this.userAccounts.asObservable();
  }

  set setUserAccounts(accountsUser: Array<GetAccountsResponse>){
    this.userAccounts.next(accountsUser);
  }

  getAccounts(){
    const idUsuario = this.loginService.getUserData.idUsuario;
    const getAccountsRequest: GetAccountsRequest = new GetAccountsRequest(idUsuario);
    this.httpClient.post<Array<GetAccountsResponse>>(PathRequest.getAccounts, getAccountsRequest)
    .subscribe((response) => {
      this.setUserAccounts = response;
    },
    (error) => {
      alert(error.error);
    });
  }

}
