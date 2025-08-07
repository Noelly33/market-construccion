import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../core/modelo/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:5001/api/Cliente'; // Asegúrate de que coincida con tu ruta del backend

  constructor(private http: HttpClient) {}

  insertarCliente(clienteDTO: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/InsertarCliente`, clienteDTO);
  }

  actualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/ActualizarCliente`, cliente);
  }

  obtenerClientePorId(id: number): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(`${this.apiUrl}/GetCliente`, { id_Cliente: id, transaccion: 'CONSULTAR_CLIENTE_ID' });
  }

  obtenerTodosLosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/ObtenerTodosLosClientes`);
  }
}

