import { Component } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';
import { ConmutadorServiceService } from 'src/app/Service/conmutador-service.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  accountsInfo: Array<GetAccountsResponse> = []; // Arreglo para almacenar la información de las cuentas del usuario
  // Suscripciones a servicios
  accounsSL!: SubscriptionLike;
  conmutadorSL!: SubscriptionLike;

  constructor(
    private readonly accountService: AccountsService,
    private readonly conmutadorServiceService: ConmutadorServiceService
  ) { }

  ngOnInit(){
    // Suscripción para obtener las cuentas del usuario
    this.accounsSL = this.accountService.getUserAccounts.subscribe((data) => {
      this.accountsInfo = data;
    });

    // Suscripción para detectar cuando se completa una transferencia y actualizar las cuentas del usuario
    this.conmutadorSL = this.conmutadorServiceService.transferCompleted$.subscribe(() =>{
      this.accountService.getAccounts(); // Volvemos a consumir el servicio para obtener las cuentas del usuario
    });
  }

  ngOnDestroy(){
    // Cancelar las suscripciones al destruir el componente para evitar fugas de memoria
    this.accounsSL?.unsubscribe();
    this.conmutadorSL?.unsubscribe();
  }

}
