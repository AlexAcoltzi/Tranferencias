import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetTransferAccountsResponse } from '../Models/GetTransferAccountsResponse';
import { HttpClient } from '@angular/common/http';
import { GetTransferAccountsRequest } from '../Models/GetTransferAccountsRequest';
import { PathRequest } from '../Constants/StringContants';
import { LoginServices } from './login-services.service';
import { TransferAccountDataRequest } from '../Models/TransferAccountDataRequest';
import { ConmutadorServiceService } from './conmutador-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  //Observable para almacenar las transferencias que ha realziado el usuario
  private transfersAccounts: BehaviorSubject<Array<GetTransferAccountsResponse>> = new BehaviorSubject<Array<GetTransferAccountsResponse>>([])

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loginService: LoginServices,
    private readonly conmutadorServiceService: ConmutadorServiceService
  ) { }

  //Se crea el metodo get para poder acceder y suscribirse al observable que contiene las transferencias del usuario
  get getTransferAccounts(){
    return this.transfersAccounts.asObservable();
  }

  // Función que utilizamos para actualiozar el valor del observable
  set setTransferAccounts(dataTransfer: Array<GetTransferAccountsResponse>) {
    this.transfersAccounts.next(dataTransfer);
  }

  // Función que realiza la petición al servidor-
  getAllTransferAccountService(){
    const idUsuario = this.loginService.getUserData.idUsuario;
    const getTransferAccountRequest: GetTransferAccountsRequest = new GetTransferAccountsRequest(idUsuario);
    this.httpClient.post<Array<GetTransferAccountsResponse>>(PathRequest.getTransfers, getTransferAccountRequest).subscribe((response) =>{
      this.setTransferAccounts = response; // En caso de que responda de forma correcta el servicio con las transferencias, almacenamos la respuesta en nuestro observable
    },
    (error) => {
      alert(error);
    });
  }

  // Función para obtener la petición al servidor
  createTransfer(idCuentaOrigen: number, idCuentaDestino: number, concepto: string, monto: number, fecha: string){
    const idTransferencia = parseInt(this.generarUUID()); //lamamos la función generarUUID() y lo casteamos a un entero para poder crear el valor del idTransferencia
    const idUsuario = this.loginService.getUserData.idUsuario; 
    const transferAccountDataRequest: TransferAccountDataRequest = new TransferAccountDataRequest(
      idTransferencia, idUsuario, idCuentaOrigen, idCuentaDestino, concepto, monto, fecha); 
    this.httpClient.post<any>(PathRequest.setTransfer, transferAccountDataRequest).subscribe((response) =>{
      this.conmutadorServiceService.announceTransferCompleted(); //En caso de que una respuesta sea exitosa se emite para que se actualicen los datos
    },
    (error) =>{
      alert('Ups! Hubo un error, vuelve a intentarlo'); // En caso de un error se muestra un mensaje generico
    })
  }

  //Función que genera valores aleatorios para un id unico
  generarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // Reemplaza cada 'x' o 'y' en el patrón con un valor aleatorio hexadecimal
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); // Genera un número aleatorio entre 0 y 15, elige un valor aleatorio de acuerdo al carácter 'x' o 'y'
      return v.toString(16); // Convierte el valor a hexadecimal y lo retorna como parte del UUID
    });
  }
}
