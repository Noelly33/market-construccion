import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private validUsers = [

      { username: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' },
      { username: 'user', password: 'user123', name: 'Usuario', role: 'user' }  
      
  ];

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private currentUserSubject = new BehaviorSubject<string>('');
    private currentRoleSubject = new BehaviorSubject<string>('');

    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    currentUser$ = this.currentUserSubject.asObservable();
    currentRole$ = this.currentRoleSubject.asObservable();

    login(username: string, password: string): boolean {
      const user = this.validUsers.find(u => 
        u.username === username && u.password === password
      );
      
      if (user) {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user.name);
        this.currentRoleSubject.next(user.role);
        return true;
      }
      return false;
    }

    logout(): void {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next('');
      this.currentRoleSubject.next(''); 
    }

    getCurrentUser(): string {
    return this.currentUserSubject.value || 'No hay usuario'; 
  }
  
    getCurrentRole(): string {
      return this.currentRoleSubject.value; 
    }

    isLoggedIn(): boolean {
      return this.isAuthenticatedSubject.value;
    }
}
