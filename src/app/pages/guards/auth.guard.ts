import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Verifica se há um token salvo

    if (!token) {
      this.router.navigate(['/login']); // Redireciona para login se não estiver autenticado
      return false;
    }

    return true;
  }
}
