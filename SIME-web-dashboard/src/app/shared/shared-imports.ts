import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { BotaoVoltarComponent } from '../components/botao-voltar/botao-voltar.component';
import { HasPermissionDisableDirective } from './directives/has-permission-disable.directive copy';

export const sharedImports = [
  CommonModule,
  HasPermissionDirective,
  HasPermissionDisableDirective,
  BotaoVoltarComponent,
];