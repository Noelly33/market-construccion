
export interface Producto {
  id_Producto?: number;
  nombreProducto: string;
  precioVenta: number;
  stock: number;
  imagen: string;
  imagenBase64: string;
  descripcion: string;
  estado: boolean;
  transaccion?: string;
}

