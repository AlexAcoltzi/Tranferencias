import { LoginComponent } from './View/login/login.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './View/home/home.component';
import { TransferComponent } from './View/transfer/transfer.component';
import { PathModel } from './Constants/StringContants';

const routes: Routes = [
  { path: PathModel.default, component: LoginComponent },
  { path: PathModel.home, component: HomeComponent },
  { path: PathModel.transfer, component: TransferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
