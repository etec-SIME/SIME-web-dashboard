import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-header',
  imports: [sharedImports],
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
