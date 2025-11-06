import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscolaComponent } from "./pages/escola/escola.component";
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EscolaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SIME-web-dashboard';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: () => console.log('User info restaurado com sucesso'),
      error: () => console.warn('Usuário não autenticado ou cookie expirado')
    });
  }
}
