import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './directives/has-permission.directive';


@NgModule({
  imports: [CommonModule, HasPermissionDirective],
  exports: [HasPermissionDirective]
})
export class SharedModule { }
