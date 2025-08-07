export interface Transportista {
  id_Transportista?: number;
  nombre_Completo: string;
  correo_Electronico: string;
  cedula: string;
  empresa: string;
  telefono: string;
  estado: boolean;
  transaccion?: string; 

}