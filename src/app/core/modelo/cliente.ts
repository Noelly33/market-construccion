export interface Cliente {
    id_Cliente?: number;
    id_Rol?: number;
    nombreCompleto: string;
    direccion: string;
    telefono: string;
    estado: boolean;
    transaccion?: string;
}
