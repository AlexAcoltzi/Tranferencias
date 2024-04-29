import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Resources } from 'src/app/Constants/Resources';
import { Numbers, PathModel } from 'src/app/Constants/StringContants';
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
     // Suscribe al servicio de inicio de sesión para obtener el estado de inicio de sesión
    this.loginServiceSL = this.loginService.getLoginValue.subscribe(loginValue =>{
      this.isLoginValue = loginValue;
    })
  }

  // Método para cerrar sesión
  logout(){
    // Establece el valor de inicio de sesión como falso
    this.loginService.setLoginValue = false;
    this.router.navigate([PathModel.default]); // Redirige a la página predeterminada
  }

  // Método para navegar a la siguiente vista
  goToNextView(numberView: number){
    // Navega a la vista correspondiente dependiendo del número de vista proporcionado
    numberView === Numbers.one ? this.router.navigate([PathModel.home]) : this.router.navigate([PathModel.transfer]);
  }

  ngOnDestroy(){
    // Se desuscribe del servicio al destruir el componente
    this.loginServiceSL?.unsubscribe();
  }

}
