import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private permissoesNecessarias: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  @Input() set appHasPermission(permissoes: string | string[]) {
    this.permissoesNecessarias = Array.isArray(permissoes) ? permissoes : [permissoes];
    this.updateView();
  }

  private updateView(): void {
    const hasPermissao = this.authService.hasAlguma(this.permissoesNecessarias);
    this.viewContainer.clear();

    if (hasPermissao) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
