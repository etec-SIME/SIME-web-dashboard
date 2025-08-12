import { Component, effect, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet ,SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  titulo = signal('Título padrão');

  constructor(private router: Router, private route: ActivatedRoute) {

    console.log('LayoutComponent constructor executado');
    effect(() => {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      ).subscribe(data => {
        this.titulo.set(data['titulo'] || 'Título padrão');
      });
    });
  }
}
