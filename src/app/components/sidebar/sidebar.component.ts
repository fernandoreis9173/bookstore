import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // menuSelecionado: number = 0;

  ngOnInit() {
    // Verifica qual menu deve ser selecionado com base na URL ou outro critério
    const currentRoute = this.router.url; // Pode usar isso para saber qual página foi carregada

    if (currentRoute.includes('dashboard')) {
      this.menuService.menuSelecionado = 1;
    } else if (currentRoute.includes('users')) {
      this.menuService.menuSelecionado = 2;
    } else if (currentRoute.includes('curriculos')) {
      this.menuService.menuSelecionado = 3;
    } else if (currentRoute.includes('partners')) {
      this.menuService.menuSelecionado = 4;
    } else if (currentRoute.includes('agendamento')) {
      this.menuService.menuSelecionado = 5;
    }
  }

  constructor(
    private router: Router,
    public menuService: MenuService,
    private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        this.router.navigate(['/login']); // Redireciona para a tela de login
      },
      error: (err) => console.error('Erro ao fazer logout:', err)
    });
  }

  selectMenu(menu: number) {
    // Atualiza a variável menuSelecionado
    this.menuService.menuSelecionado = menu;
    this.router.navigate([this.getRoute(menu)]);
  }

  private getRoute(menu: number): string {
    switch (menu) {
      case 1: return '/dashboard';
      case 2: return '/users';
      case 3: return '/curriculos';
      case 4: return '/partners';
      case 5: return '/agendamento';
      default: return '/';
    }
  }
}
