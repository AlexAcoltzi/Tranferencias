import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { Numbers, StringConstants } from 'src/app/Constants/StringContants';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';
import { ConmutadorServiceService } from 'src/app/Service/conmutador-service.service';
import { TransferService } from 'src/app/Service/transfer.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {

  selectedAccount: string = StringConstants.Empty; // Cuenta de origen seleccionada por el usuario
  destinationAccount!: number; // Cuenta de destino para la transferencia
  amount!: number; // Monto de la transferencia
  concept: string = StringConstants.Empty; // Concepto de la transferencia
  transferGroup!: FormGroup; // Grupo de formularios para la validación de datos
  accountsInfo: Array<GetAccountsResponse> = []; // Información de las cuentas del usuario
  formattedDate: string = StringConstants.Empty; // Fecha formateada para la transferencia
  
  accounsSL!: SubscriptionLike;
  conmutadorSL!: SubscriptionLike; 



  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountsService,
    private readonly transferService: TransferService,
    private readonly conmutadorServiceService: ConmutadorServiceService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscripción para obtener la información de las cuentas del usuario
    this.accounsSL = this.accountService.getUserAccounts.subscribe((accounts) =>{
      this.accountsInfo = accounts;
    });

    // Inicialización del grupo de formularios y definición de las validaciones
    this.transferGroup = this.formBuilder.group({
      originAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      concept: ['', Validators.required],
      amount: ['', Validators.required],
    });

    // Suscripción para detectar cuando se completa una transferencia y actualizar las cuentas del usuario
    this.conmutadorSL = this.conmutadorServiceService.transferCompleted$.subscribe(() =>{
      this.transferGroup.reset();
      this.cdr.detectChanges();
    });
  }

  // Método para manejar la lógica de la transferencia
  showData(){
    if (this.transferGroup.valid) {
      const originAccount = parseInt(this.selectedAccount.slice(0,8));
      const amount = this.amount;
      const originAccountInfo = this.accountsInfo.find(account => account.idCuenta === originAccount);
      const destinationAccount = this.destinationAccount;

      // Validaciones adicionales
      if (amount > 100000) {
        alert('El monto debe ser menor 100000.');
        return;
      }

      if (originAccountInfo && originAccountInfo.saldo < amount) {
        alert('No tienes fondos suficientes en la cuenta');
        return;
      }

      this.getDate(); // Obtener la fecha actual
      this.transferService.createTransfer(originAccount, destinationAccount, this.concept, amount, this.formattedDate);
    } else {
      alert('Por favor, rellena todos los campos');
    }
  }

  // Método para limpiar el formulario
  clearForm(){
    this.transferGroup.reset();
  }

  // Método para obtener la fecha actual en un formato específico
  getDate(){
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    this.formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
  }

  ngOnDestroy(){
    this.accounsSL?.unsubscribe();
  }

}
