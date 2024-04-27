import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(  ) { }

  get getLoginValue(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  set setLoginValue(newLoginValue: boolean) {
    this.isLogin.next(newLoginValue);
  }
}
