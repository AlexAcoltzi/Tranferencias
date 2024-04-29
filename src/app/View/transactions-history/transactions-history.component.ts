import { ChangeDetectorRef, Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { SubscriptionLike } from 'rxjs';
import { Numbers } from 'src/app/Constants/StringContants';
import { GetTransferAccountsResponse } from 'src/app/Models/GetTransferAccountsResponse';
import { ConmutadorServiceService } from 'src/app/Service/conmutador-service.service';
import { TransferService } from 'src/app/Service/transfer.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent {

  @Input() showBody: boolean = true; // Indica si se debe mostrar el cuerpo del componente por defecto esta en true
  @Input() showTite: boolean = true; // Indica si se debe mostrar el titulo del componente por defecto esta en true
  @Input() customSize: boolean = false; // Indica si se debe aplicar un tamaño personalizado al componente por defecto esta en falso
  data: Array<GetTransferAccountsResponse> = []; // Variable para almacenar los datos de las transferencias
  transferSL!: SubscriptionLike; // Suscripción al servicio de transferencias
  conmutadorSL!: SubscriptionLike; // Suscripción al servicio del conmutador

  constructor(private readonly transferService: TransferService,
    private readonly cdr: ChangeDetectorRef,
    private readonly conmutadorServiceService: ConmutadorServiceService) { }

  ngOnInit(): void {

    this.transferSL = this.transferService.getTransferAccounts.subscribe((transferData) => {
      this.data = transferData;
      if (this.data.length > Numbers.zero) {
        this.createPieChart(); // Si hay datos de transferencias, se crea el gráfico de pastel
      }
    });

    // Suscripción a la finalización de las transferencias
    this.conmutadorSL = this.conmutadorServiceService.transferCompleted$.subscribe(() => {
      this.transferService.getAllTransferAccountService(); // Cuando se completa una transferencia, se actualiza la lista de transferencias
    })

  }

  // Método para crear el gráfico de pastel
  createPieChart(): void {
    //Almacena la cuenta destino con la cantidad totall de las transferencias
    let totals: { [idCuentaDestino: number]: number } = {};
    // recorremos las transferencias y vamos aumentando el monto a a cuenta destrino en caso de existir y sino se crea nuevamente
    this.data.forEach(transfer => {
      if (totals[transfer.idCuentaDestino]) {
        totals[transfer.idCuentaDestino] += transfer.monto;
      } else {
        totals[transfer.idCuentaDestino] = transfer.monto;
      }
    });

    // Preparar los datos para el gráfico
    const labels: string[] = [];
    const values: number[] = [];
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];

    // Agregamos los valores a los datos necesarios para el gráfico
    Object.entries(totals).forEach(([idCuentaDestino, total]) => {
      labels.push(`Cuenta ${idCuentaDestino}`);
      values.push(total);
      backgroundColors.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`);
      borderColors.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`);
    });

    // Construimos el gráfico
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dataset 1',
          data: values, // Datos que llenarán los sectores del gráfico
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy(){
    // Se gestionan las desuscripciones para evitar pérdidas de memoria
    this.transferSL?.unsubscribe();
    this.conmutadorSL?.unsubscribe();
  }

}
