export interface JwtPayload {
   sub: string;       // username o identificador
   nombre?: string;   // si tu token trae el nombre
   role?: string;     // si incluiste el rol
   [key: string]: any; 
}
