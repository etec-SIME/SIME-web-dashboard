import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = environment.apiUrl + '/usuarios';
  
  constructor( private http: HttpClient ) { }

  getAllUsuarios(): Observable<UsuarioProjection[]> {
    return this.http.get<UsuarioProjection[]>(this.apiUrl);
  }
}
