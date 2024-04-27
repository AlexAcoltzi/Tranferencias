import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Numbers, StringConstants } from 'src/app/Constants/StringContants';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {

  selectedAccount: string = StringConstants.Empty;
  destinationAccount: number = Numbers.zero;
  amount: number = Numbers.zero;
  transferGroup!: FormGroup; 

  constructor() {}

  ngOnInit() {

  }

  showData(){
    alert(`cuenta seeccionada: ${this.selectedAccount} \n cuenta destino: ${this.destinationAccount} \n monto: ${this.amount}`)
  }

}
