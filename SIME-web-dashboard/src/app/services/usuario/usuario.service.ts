import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { usuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { loginDTO } from '../../DTOs/loginDTO';
import { tokenDTO } from '../../DTOs/tokenDTO';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/usuarios';
  
  constructor( private http: HttpClient ) { }

  getAllUsuarios(): Observable<usuarioProjection[]> {
    return this.http.get<usuarioProjection[]>(this.apiUrl);
  }

  login(credentials: loginDTO) : Observable<tokenDTO> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => localStorage.setItem('token', response.token))   // guarda o token
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // retorna o token do localStorage
  }

  logout(): void {
    localStorage.removeItem('token');  // remove o token do localStorage
  }
}
