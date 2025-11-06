import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { BotaoVoltarComponent } from '../components/botao-voltar/botao-voltar.component';

export const sharedImports = [
  CommonModule,
  HasPermissionDirective,
  BotaoVoltarComponent,
];
