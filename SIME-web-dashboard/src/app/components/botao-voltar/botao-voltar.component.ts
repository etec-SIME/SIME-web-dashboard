import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-botao-voltar',
  templateUrl: './botao-voltar.component.html',
  styleUrl: './botao-voltar.component.css',
  standalone: true
})
export class BotaoVoltarComponent {
  private location = inject(Location);

  voltar() {
    this.location.back();
  }
}
