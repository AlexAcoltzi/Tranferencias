import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { GetTransferAccountsResponse } from 'src/app/Models/GetTransferAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';
import { TransferService } from 'src/app/Service/transfer.service';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.css']
})
export class CurrentBalanceComponent {

  @Input() isCurrentBalance: boolean = false; // Entrada que indica si el componente se utiliza para mostrar el saldo actual de las cuentas o las transferencias de una cuenta específica
  @Input() numberAccount!: number; // Número de cuenta utilizado para filtrar las transferencias
  accountsInfo: Array<GetAccountsResponse> = []; // Arreglo que almacena la información de las cuentas del usuario
  transferAccounts: Array<GetTransferAccountsResponse> = []; // Arreglo que almacena las transferencias de una cuenta específica
  getUsersSL!: SubscriptionLike; //Suscripción al servicio de cuentas del usuario
  getTransferSL!: SubscriptionLike; //Suscripción al servicio de transferencias del usuario
  lastTransferDateMap: { [accountId: number]: string } = {}; // Mapa para almacenar la última fecha de transferencia por cuenta



  constructor( 
    private readonly accountService: AccountsService,
    private readonly transferService: TransferService,
    private readonly cdr: ChangeDetectorRef
   ) {
  }


  ngOnInit() {
    //Validamos si es necesario suscribirnos al servicio para obtener las cuentas
    if (this.isCurrentBalance) {
      this.getUsersSL = this.accountService.getUserAccounts.subscribe((data) => {
        this.accountsInfo = data;
        this.cdr.detectChanges();
      });
    } 
    //Nos suscribimos al servicio de transferencias
    this.getTransferSL = this.transferService.getTransferAccounts.subscribe((transferData) => {
      this.transferAccounts = transferData.filter(transfer => transfer.idCuentaOrigen === this.numberAccount);

      // Calcular la última fecha de transferencia para cada cuenta
      transferData.forEach(transfer => {
        if (!this.lastTransferDateMap[transfer.idCuentaOrigen] || transfer.fecha > this.lastTransferDateMap[transfer.idCuentaOrigen]) {
          this.lastTransferDateMap[transfer.idCuentaOrigen] = transfer.fecha;
        }
      });
    });
  }

  ngOnDestroy(){
    //Gestionamos el desuscribe para evitar desbordamiento de memoria 
    this.getUsersSL?.unsubscribe();
    this.getTransferSL?.unsubscribe();
  }

}
