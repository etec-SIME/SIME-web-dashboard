import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioProjection } from '../../DTOs/Projections/UsuarioProjection';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/usuarios';
  
  constructor( private http: HttpClient ) { }

  getAllUsuarios(): Observable<UsuarioProjection[]> {
    return this.http.get<UsuarioProjection[]>(this.apiUrl);
  }
}
