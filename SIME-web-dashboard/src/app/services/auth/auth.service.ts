import { Injectable } from '@angular/core';
import { tokenDTO } from '../../DTOs/tokenDTO';
import { LoginDTO } from '../../DTOs/loginDTO';
import { LoginEscolaDTO } from '../../DTOs/loginEscolaDTO';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  
  constructor( private http: HttpClient ) { }

  loginUsuario(credentials: LoginDTO) : Observable<tokenDTO> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credentials, { withCredentials: true });
  }

  loginEscola(credentials: LoginEscolaDTO) : Observable<tokenDTO> {
    return this.http.post<any>(`${this.apiUrl}/escola/login`, credentials, { withCredentials: true });
  }

  // getToken(): string | null {
  //   return localStorage.getItem('token'); // retorna o token do localStorage
  // }

  // logout(): void {
  //   localStorage.removeItem('token');  // remove o token do localStorage
  // }
}
