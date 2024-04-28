import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetTransferAccounts } from '../Models/GetTransferAccounts';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private transfersAccounts: BehaviorSubject<Array<GetTransferAccounts>> = new BehaviorSubject<Array<GetTransferAccounts>>([
    {
      idCuentaOrigen: 100, idCuentaDestino: 200, concepto: 'Ahorro', monto: 100, fecha: '28/May/2024'
    },
    {
      idCuentaOrigen: 100, idCuentaDestino: 200, concepto: 'Ahorro', monto: 300, fecha: '29/May/2024'
    },
    {
      idCuentaOrigen: 100, idCuentaDestino: 200, concepto: 'Ahorro', monto: 50, fecha: '30/May/2024'
    },
    {
      idCuentaOrigen: 101, idCuentaDestino: 800, concepto: 'Prueba', monto: 1000, fecha: '29/Abril/2024'
    },
    {
      idCuentaOrigen: 101, idCuentaDestino: 150, concepto: 'Plataformas', monto: 250, fecha: '15/Abril/2024'
    }
  ])

  constructor() { }

  get getTransferAccounts(){
    return this.transfersAccounts.asObservable();
  }

  set setTransferAccounts(dataTransfer: Array<GetTransferAccounts>) {
    this.transfersAccounts.next(dataTransfer);
  }
}
