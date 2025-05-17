import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transportista } from '../core/modelo/transportista';


@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private transportistas: Transportista[] = [
    { id: 1, nombre: 'Carlos Pérez', correo: 'cperez@mail.com', cedula: '0923456789', empresa: 'TransLogistic', telefono: '0991234567', activo: true, rol: 'Transportista' }
  ];

  private transportistasSubject = new BehaviorSubject<Transportista[]>(this.transportistas);

  constructor() {}

  getTransportistas(): Observable<Transportista[]> {
    return this.transportistasSubject.asObservable();
  }

  agregarTransportista(nuevo: Transportista) {
    const nuevoId = this.transportistas.length ? Math.max(...this.transportistas.map(t => t.id)) + 1 : 1;
    nuevo.id = nuevoId;
    this.transportistas.push(nuevo);
    this.transportistasSubject.next(this.transportistas);
  }

  actualizarTransportista(actualizado: Transportista) {
    const index = this.transportistas.findIndex(t => t.id === actualizado.id);
    if (index !== -1) {
      this.transportistas[index] = actualizado;
      this.transportistasSubject.next(this.transportistas);
    }
  }

  eliminarTransportista(id: number) {
    this.transportistas = this.transportistas.filter(t => t.id !== id);
    this.transportistasSubject.next(this.transportistas);
  }
}
