import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chamado } from '../../models/chamado';
import { chamadoRequestDTO } from '../../DTOs/chamadoRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';
  
  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamado[]> {
    return this.http.get<chamado[]>(this.apiUrl);
  }

  criarChamado(rmUsuario: string, dto: chamadoRequestDTO): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/${rmUsuario}/chamado`, dto);
  }
}
