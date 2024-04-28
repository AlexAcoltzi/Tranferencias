import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './View/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './View/home/home.component';
import { NavbarComponent } from './View/navbar/navbar.component';
import { CurrentBalanceComponent } from './View/current-balance/current-balance.component';
import { TransactionsHistoryComponent } from './View/transactions-history/transactions-history.component';
import { TransferComponent } from './View/transfer/transfer.component';
import { TransferFormComponent } from './View/transfer-form/transfer-form.component';
import { MainExpensiveComponent } from './View/main-expensive/main-expensive.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CurrentBalanceComponent,
    TransactionsHistoryComponent,
    TransferComponent,
    TransferFormComponent,
    MainExpensiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
