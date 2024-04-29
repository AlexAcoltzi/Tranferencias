import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConmutadorServiceService {

  //Observable que no es necesario que regrese un valor, solo necesitamos saber que emitio algun cambio
  private transferCompletedSource = new Subject<void>();

  constructor() { }

  // Observable para que los componentes se suscriban a los eventos de transferencia completada
  transferCompleted$: Observable<void> = this.transferCompletedSource.asObservable();

  // Método para anunciar que se ha completado una transferencia
  announceTransferCompleted() {
    this.transferCompletedSource.next();
  }
}
