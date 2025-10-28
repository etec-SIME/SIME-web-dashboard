import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() titulo: string = '';

  constructor(private router: Router) {}

  navegarParaPerfis() {
    this.router.navigate(['/layout/perfil']);
  }
}
