import { Component } from '@angular/core';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  accountsInfo: Array<GetAccountsResponse> = [];

  constructor(
    private readonly accountService: AccountsService
  ) { }

  ngOnInit(){
    this.accountService.getUserAccounts.subscribe((data) => {
      this.accountsInfo = data;
    });
  }

}
