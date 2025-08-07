import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtPayload } from '../core/modelo/jwt-payload';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:5001/api/Cuenta/Login';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<string>(this.getUsernameFromToken() || '');
  private tokenSubject = new BehaviorSubject<string>(this.getToken() || '');

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Llamada al backend para login
  login(username: string, clave: string): Observable<any> {
    const body = { username, clave };
    return this.http.post<any>(this.apiUrl, body); // { token: '...' }
  }

  // Guarda el token en localStorage y actualiza los observables
  guardarToken(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    this.tokenSubject.next(token);
    this.currentUserSubject.next(username);
    this.isAuthenticatedSubject.next(true);
  }

  // Elimina los datos del usuario
  logout(): void {
    localStorage.clear();
    this.tokenSubject.next('');
    this.currentUserSubject.next('');
    this.isAuthenticatedSubject.next(false);
  }

  // Devuelve el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verifica si hay un token válido
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Devuelve el nombre del usuario desde localStorage o token
  getCurrentUser(): string {
    return this.currentUserSubject.value || this.getUsernameFromToken() || 'No hay usuario';
  }

  // Devuelve el rol actual desde el token JWT
  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  // Extrae el nombre de usuario desde el token JWT
  private getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  // Verifica si hay token al iniciar el servicio
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}

// Interfaz para mapear el contenido del token
interface TokenPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  exp?: number;
  iss?: string;
}
