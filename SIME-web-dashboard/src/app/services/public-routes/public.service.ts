import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPerfilResponseDTO } from '../../DTOs/TipoPerfilResponseDTO'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = environment.apiUrl + '/public';

  constructor( private http: HttpClient ) { }

  getTipoPerfilNomes() : Observable<TipoPerfilResponseDTO[]> {
    return this.http.get<TipoPerfilResponseDTO[]>(`${this.apiUrl}/tipos-perfil`);
  }
}
