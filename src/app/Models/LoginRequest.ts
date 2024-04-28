export class LoginRequest {
    correo!: string;
    contraseña!: string;

    constructor(corre: string, contraseña: string){
        this.correo = corre;
        this.contraseña = contraseña;
    }
}
