import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transportista } from '../core/modelo/transportista';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
   private apiUrl = 'https://localhost:5001/api/Transportista'; // cambia según tu host

  constructor(private http: HttpClient) {}

  insertarTransportista(transportista: Transportista): Observable<any> {
  return this.http.post(`${this.apiUrl}/InsertarTransportista`, transportista);
}

actualizarTransportista(transportista: Transportista): Observable<any> {
  return this.http.put(`${this.apiUrl}/ActualizarTransportista`, transportista);
}

obtenerTodos(): Observable<Transportista[]> {
  return this.http.get<Transportista[]>(`${this.apiUrl}/ObtenerTodosLosTransportistas`);
}

obtenerPorCedula(cedula: string): Observable<Transportista[]> {
  let params = new HttpParams()
    .set('cedula', cedula)
    .set('transaccion', 'CONSULTAR_TRANSPORTISTA_POR_CEDULA');

  return this.http.get<Transportista[]>(`${this.apiUrl}/ObtenerTransportistaPorCedula`, { params });
}

eliminarTransportista(id: number): Observable<any> {
  let params = new HttpParams().set('idTransportista', id);
  return this.http.delete(`${this.apiUrl}/EliminarTransportista`, { params });
}

buscarTransportista(filtro: Transportista): Observable<Transportista[]> {
  return this.http.post<Transportista[]>(`${this.apiUrl}/GetTransportista`, filtro);
}

}
