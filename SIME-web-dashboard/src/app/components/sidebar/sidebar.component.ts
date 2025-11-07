import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, sharedImports],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  navegarHome() {
    this.router.navigate(['/layout/home']);
  }

  navegarPendentes() {
    this.router.navigate(['/layout/chamados-pendentes']);
  }

  navegarConcluidos() {
    this.router.navigate(['/layout/chamados-concluidos']);
  }

  navegarCriar() {
    this.router.navigate(['/layout/criar']);
  }

  opcaoAtual: 'home' | 'pendentes' | 'concluidos' | 'criar' = 'home';
}
