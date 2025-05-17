import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  realizarPago(datosPago: any): Observable<any> {
    console.log('Datos enviados al servidor:', datosPago);

    return of({ mensaje: 'Pago exitoso' });
  }
}
