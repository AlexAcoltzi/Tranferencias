import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { GetTransferAccounts } from 'src/app/Models/GetTransferAccounts';
import { AccountsService } from 'src/app/Service/accounts.service';
import { TransferService } from 'src/app/Service/transfer.service';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.css']
})
export class CurrentBalanceComponent {

  @Input() isCurrentBalance: boolean = false;
  @Input() numberAccount!: number;
  accountsInfo: Array<GetAccountsResponse> = [];
  transferAccounts: Array<GetTransferAccounts> = [];


  constructor( 
    private readonly accountService: AccountsService,
    private readonly transferService: TransferService,
    private readonly cdr: ChangeDetectorRef
   ) {
  }

  ngOnInit() {
    if (this.isCurrentBalance) {
      this.accountService.getUserAccounts.subscribe((data) => {
        this.accountsInfo = data;
        console.log(this.accountsInfo);
        this.cdr.detectChanges();
      });
    } else {
      this.transferService.getTransferAccounts.subscribe((transferData) => {
        this.transferAccounts = transferData.filter(transfer => transfer.idCuentaOrigen === this.numberAccount)
      })
    }
  }

}
