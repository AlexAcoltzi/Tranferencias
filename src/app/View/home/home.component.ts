import { Component } from '@angular/core';
import { StringConstants } from 'src/app/Constants/StringContants';
import { GetAccountsResponse } from 'src/app/Models/GetAccountsResponse';
import { AccountsService } from 'src/app/Service/accounts.service';
import { LoginServices } from 'src/app/Service/login-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nameUser: string = StringConstants.Empty;
  accounts: Array<GetAccountsResponse> = [];

  constructor(
    private readonly loginService: LoginServices,
    private readonly accountsService: AccountsService
  ) {}

  ngOnInit() {
    this.nameUser = this.loginService.getUserData.nombre;
    this.accountsService.getAccounts();
    this.accountsService.getUserAccounts.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

}
