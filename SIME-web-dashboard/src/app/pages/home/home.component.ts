import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CalendarioMensalComponent } from "../../components/calendario-mensal/calendario-mensal.component";
import { BarraPerfilComponent } from "../../components/barra-perfil/barra-perfil.component";
import { CalendarioSemanalComponent } from "../../components/calendario-semanal/calendario-semanal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CalendarioMensalComponent, BarraPerfilComponent, CalendarioSemanalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
