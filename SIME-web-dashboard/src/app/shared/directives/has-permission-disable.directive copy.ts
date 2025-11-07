import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Directive({
  selector: '[appHasPermissionDisable]',
  standalone: true
})
export class HasPermissionDisableDirective implements AfterViewInit  {
    @Input('appHasPermissionDisable') permissoes!: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const permissoes = Array.isArray(this.permissoes) ? this.permissoes : [this.permissoes];
    const hasPermissao = this.authService.hasAlguma(permissoes);

    this.viewContainer.clear();
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    const element = viewRef.rootNodes[0] as HTMLElement;

    if (!hasPermissao && element) {
      this.renderer.setStyle(element, 'pointer-events', 'none');
      this.renderer.setStyle(element, 'cursor', 'not-allowed');
    }
  }
}
