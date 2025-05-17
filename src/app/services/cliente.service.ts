import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly STORAGE_KEY = 'clientes_registrados';

  // Clientes estáticos iniciales
  private initialClientes = [
    { id: 1, username: 'dabh', password: 'dabh123', nombre: 'Diana Ballesteros', role: 'user', fechaRegistro: new Date().toISOString() },
    { id: 2, username: 'noe', password: 'noe123', nombre: 'Noely Ruiz', role: 'user', fechaRegistro: new Date().toISOString() }
  ];

  constructor(private router: Router) {
    // Inicializar localStorage si está vacío
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.initialClientes));
    }
  }

  registrarCliente(clienteData: any): boolean {
    const clientes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Cambiado: verificar username duplicado, no email
    if (clientes.some((c: any) => c.username === clienteData.username)) {
      return false; // Username ya existe
    }

    clientes.push({
      ...clienteData,
      id: Date.now(), // ID único
      role: 'user',   // Rol por defecto
      fechaRegistro: new Date().toISOString()
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clientes));
    return true; // Registro exitoso
  }

  // Login usando username en vez de email
  Login(username: string, password: string): boolean {
    const clientes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const cliente = clientes.find((c: any) => c.username === username && c.password === password);
    return !!cliente;
  }

  getClientes(): any[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  getClienteActual(username: string): any {
    const clientes = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return clientes.find((c: any) => c.username === username);
  }
}
