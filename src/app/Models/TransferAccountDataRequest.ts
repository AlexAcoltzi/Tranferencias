export class TransferAccountDataRequest{
    idTransferencia!: number;
    idUsuario!: number;
    idCuentaOrigen!: number;
    idCuentaDestino!: number;
    concepto!: string;
    monto!: number;
    fecha!: string;

    constructor(
        idTransferencia: number,
        idUsuario: number,
        idCuentaOrigen: number,
        idCuentaDestino: number,
        concepto: string,
        monto: number,
        fecha: string
    ) {
        this.idTransferencia = idTransferencia;
        this.idUsuario = idUsuario;
        this.idCuentaOrigen = idCuentaOrigen;
        this.idCuentaDestino = idCuentaDestino;
        this.concepto = concepto;
        this.monto = monto;
        this.fecha = fecha;
    }
}