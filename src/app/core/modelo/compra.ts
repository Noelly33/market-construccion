import { DetalleCompra } from "./detalleCompra";
import { Pago } from "./pago";

export interface Compra {
  id_Compra?: number;
  fecha?: string;
  total: number;
  metodo_Entrega: string;
  id_Transportista?: number;
  detalles: DetalleCompra[];
  pago: Pago;
  estado?: string;
  transaccion?: string;
}
