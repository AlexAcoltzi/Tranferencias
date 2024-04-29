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

  //Observable que obtiene las cuentas del usuario
  private userAccounts: BehaviorSubject<Array<GetAccountsResponse>> = new BehaviorSubject<Array<GetAccountsResponse>>([])

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loginService: LoginServices
  ) { }

  //Con esta funcioón Obtenemos los valores del BehaviorSubject al cual nos podemos suscribir para detectar cambios en las cuentas del usuario;
  get getUserAccounts() {
    return this.userAccounts.asObservable();
  }

  // Función que actualiza el BehaviorSubject en caso de sea necesario establecer un cambio
  set setUserAccounts(accountsUser: Array<GetAccountsResponse>){
    this.userAccounts.next(accountsUser);
  }

  // Función que realiza un petición al servidor para obtener las Cuentas del usuario
  getAccounts(){
    const idUsuario = this.loginService.getUserData.idUsuario;
    const getAccountsRequest: GetAccountsRequest = new GetAccountsRequest(idUsuario);
    this.httpClient.post<Array<GetAccountsResponse>>(PathRequest.getAccounts, getAccountsRequest)
    .subscribe((response) => {
      this.setUserAccounts = response; //En caso de que la respuesta se exitosa, almacenamos el resultado en nuestro observable.
    },
    (error) => {
      alert(error.error); //En caso de error imprimimos el mensaje del servidor
    });
  }

}
