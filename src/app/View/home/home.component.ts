import { Component } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { StringConstants } from 'src/app/Constants/StringContants';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';
import { LoginServices } from 'src/app/Service/login-services.service';
import { TransferService } from 'src/app/Service/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nameUser: string = StringConstants.Empty; //Variable que mostrara el nombre del usuario
  accounts: Array<GetAccountsResponse> = []; // Lista de cuentas del usuario
  accountSL!: SubscriptionLike; // Suscripción para obtener las cuentas del usuario

  constructor(
    private readonly loginService: LoginServices,
    private readonly accountsService: AccountsService,
    private readonly transferService: TransferService
  ) {}

  ngOnInit() {
    // Obtener el nombre de usuario del servicio de inicio de sesión
    this.nameUser = this.loginService.getUserData.nombre;
    this.accountsService.getAccounts(); // Función para consumir el servicio para obtener las cuentas del usuario
    // Suscribirse a los cambios en las cuentas del usuario
    this.accountSL = this.accountsService.getUserAccounts.subscribe((accounts) => {
      this.accounts = accounts;
    });
    // Función para copnsurmir el servicio de las transferencias
    this.transferService.getAllTransferAccountService();
  }

  ngOnDestroy(){
     //Gestionamos el desuscribe para evitar desbordamiento de memoria 
    this.accountSL?.unsubscribe();
  }

}
