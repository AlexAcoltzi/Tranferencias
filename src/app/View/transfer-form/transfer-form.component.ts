import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Numbers, StringConstants } from 'src/app/Constants/StringContants';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {

  selectedAccount: string = StringConstants.Empty;
  destinationAccount: string = StringConstants.Empty;
  amount: string = StringConstants.Empty;
  concept: string = StringConstants.Empty;
  transferGroup!: FormGroup; 

  constructor(
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.transferGroup = this.formBuilder.group({
      originAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  showData(){
    alert(`cuenta seeccionada: ${this.selectedAccount} \n cuenta destino: ${this.destinationAccount} \n monto: ${this.amount}`)
  }

  clearForm(){
    this.transferGroup.reset();
  }

}
