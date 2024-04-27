import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Resources } from 'src/app/Constants/Resources';
import { PathModel } from 'src/app/Constants/StringContants';
import { LoginServices } from 'src/app/Service/login-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loginServiceSL!: SubscriptionLike;
  icon: string = Resources.logo;
  isLoginValue: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginServices
  ) { }

  ngOnInit() {
    this.loginServiceSL = this.loginService.getLoginValue.subscribe(loginValue =>{
      this.isLoginValue = loginValue;
      console.log(this.isLoginValue);
    })
  }

  logout(){
    this.loginService.setLoginValue = false;
    this.router.navigate([PathModel.default]);
  }

  goToNextView(numberView: number){
    numberView === 1 ? this.router.navigate([PathModel.home]) : this.router.navigate([PathModel.transfer]);
  }

  ngOnDestroy(){
    this.loginServiceSL?.unsubscribe();
  }

}
