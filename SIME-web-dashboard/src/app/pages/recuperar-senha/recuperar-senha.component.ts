import { Component } from '@angular/core';
import { PaginaDeFundoComponent } from "../../components/pagina-de-fundo/pagina-de-fundo.component";
import { CommonModule } from '@angular/common'; // Boa prática incluir, caso use *ngIf, *ngFor, etc.
import { FormsModule } from '@angular/forms'; // Necessário se você usar [(ngModel)]

@Component({
  selector: 'app-recuperar-senha',
  standalone: true, // <-- ESSA LINHA ESTAVA FALTANDO!
  imports: [
    PaginaDeFundoComponent,
    CommonModule, 
    FormsModule
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.css'
})
export class RecuperarSenhaComponent {
    // Você provavelmente vai querer adicionar uma lógica aqui para recuperar a senha
    email: string = '';

    solicitarRecuperacao() {
        // Implemente a lógica de serviço aqui
    }
}
