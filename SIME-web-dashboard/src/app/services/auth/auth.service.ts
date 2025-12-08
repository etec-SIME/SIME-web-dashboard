import { Injectable } from '@angular/core';
import { tokenDTO } from '../../DTOs/tokenDTO';
import { LoginDTO } from '../../DTOs/loginDTO';
import { LoginEscolaDTO } from '../../DTOs/loginEscolaDTO';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInfoDTO } from '../../DTOs/UserInfoDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  private userInfoSubject = new BehaviorSubject<UserInfoDTO | null>(null);
  userInfo$ = this.userInfoSubject.asObservable();

  private permissoes: string[] = [];
  
  constructor( private http: HttpClient ) { }

  loginUsuario(credentials: LoginDTO) : Observable<tokenDTO> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credentials, { withCredentials: true });
  }

  loginEscola(credentials: LoginEscolaDTO) : Observable<tokenDTO> {
    return this.http.post<any>(`${this.apiUrl}/escola/login`, credentials, { withCredentials: true });
  }

  getUserInfo(): Observable<UserInfoDTO> {
    return this.http.get<UserInfoDTO>(`${this.apiUrl}/usuarios/user-info`, { withCredentials: true }).pipe(
      tap(userInfo => {
        this.userInfoSubject.next(userInfo);
        this.setPermissoes(userInfo.permissoes);
      })
    );
  }

  setPermissoes(permissoes: string[]) {
    this.permissoes = permissoes;
  }

  getPermissoes(): string[] {
    return this.permissoes;
  }

  hasPermissao(permissao: string): boolean {
    return this.permissoes.includes(permissao);
  }

  hasAlguma(permissoesNecessarias: string[]): boolean {
    return this.permissoes.includes('ROLE_ESCOLA') ||
          permissoesNecessarias.some(p => this.permissoes.includes(p));
  }
}
