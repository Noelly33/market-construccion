export interface Pago{
  id_Pago?: number;
  id_Compra?: number;
  nombre_Titular: string;
  numero_Tarjeta: string;
  fecha_Expiracion: string;
  cvv: string;
  transaccion?: string;
}
