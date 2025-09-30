import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPerfilResponseDTO } from '../../DTOs/TipoPerfilResponseDTO'

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = 'http://localhost:8080/public';

  constructor( private http: HttpClient ) { }

  getTipoPerfilNomes() : Observable<TipoPerfilResponseDTO[]> {
    return this.http.get<TipoPerfilResponseDTO[]>(`${this.apiUrl}/tipos-perfil`);
  }
}
