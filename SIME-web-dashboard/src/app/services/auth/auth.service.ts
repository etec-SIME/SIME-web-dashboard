import { Injectable } from '@angular/core';
import { loginDTO } from '../../DTOs/loginDTO';
import { tokenDTO } from '../../DTOs/tokenDTO';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuarios';
  
  constructor( private http: HttpClient ) { }

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
