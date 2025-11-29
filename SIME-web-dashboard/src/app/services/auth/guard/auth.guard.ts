import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermissions = route.data['permissions'] as string[] | undefined;

    return this.authService.getUserInfo().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/layout/login']);
          return false;
        }
        if (user.permissoes.includes('ROLE_ESCOLA')) {
          return true;
        }

        // Se a rota não exigir permissão específica, libera
        if (!requiredPermissions || requiredPermissions.length === 0) {
          return true;
        }

        const hasPermissions = requiredPermissions.every(p =>
          user.permissoes.includes(p)
        );

        if (!hasPermissions) {
          this.router.navigate(['/acesso-negado']);
        }

        return hasPermissions;
      }),
      catchError(() => {
        this.router.navigate(['/layout/login']);
        return of(false);
      })
    );
  }
}
