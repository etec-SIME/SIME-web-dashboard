import { Component, effect, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet ,SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  titulo = signal('Título padrão');

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('LayoutComponent constructor executado');
  }

  ngOnInit(): void {
    // Atualiza no carregamento inicial
    this.atualizarTitulo();
  
    // Atualiza em toda navegação
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.atualizarTitulo());
  }
  private atualizarTitulo() {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    route.data.subscribe(data => {
      console.log('Data da rota ativa:', data);
      this.titulo.set(data['titulo'] || 'Título padrão');
    });
  }
}

