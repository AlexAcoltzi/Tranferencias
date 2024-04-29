import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';
import { PathModel, PathRequest } from '../Constants/StringContants';
import { LoginResponse } from '../Models/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  //Observbable que identificara si hay una sesión iniciada
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //Observable que almacenara el id y el nombre del usuario incilizado con datos ficticios, cambian con el consumo de servicios
  private userData: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>({
    idUsuario: 1, nombre: 'Alex Acoltzi'
  })

  constructor( 
    private readonly httpClient: HttpClient,
    private readonly router: Router
   ) { }

  //Función por la cual podemos acceder all componente isLogin y suscribirnos para detectar el cambio en el mismo
  get getLoginValue(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  //Función que actualiza el observable en  caso de un logueo o deslogueo
  set setLoginValue(newLoginValue: boolean) {
    this.isLogin.next(newLoginValue);
  }

  //Con esta función obtenemos los datos del usuario, al iniciar sesión se obtiene y este no cambia, por lo que no es necesario hacerlo un observable
  get getUserData(){
    return this.userData.value;
  }

  //Esta función actualiza el valor del observable
  set setUserData(newUserData: LoginResponse){
    this.userData.next(newUserData);
  }

  //Funcion en la cual se hace la petición para obtener el logueo dell usuarios
  getLogin(username: string, password: string){
      const login: LoginRequest = new LoginRequest(username, password);
      this.httpClient.post<LoginResponse>(PathRequest.login, login).subscribe((response) => {
        this.setUserData = response; //En casod e responder de forma exitosa, almacenamos llos datos del usuario que se utilizaran para las transferencias
        this.setLoginValue = true; // Atualizamos el valor de setLoginValue ya que hay una sesion activa
        this.router.navigate([PathModel.home]); //Por ultimo redireccionamos a la vista de Home
      }, 
    (error) => {
      alert(error.error); //En caso de error imprimimos el mensaje que regrese el servidor
    });
  }
}
