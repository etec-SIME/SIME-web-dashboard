import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { ChamadoRequestDTO } from '../../DTOs/chamadoRequestDTO';
import { chamado } from '../../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';

  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamado[]> {
    return this.http.get<chamado[]>(this.apiUrl);
  }

  getChamadosByPrioridade(prioridade: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE'): Observable<ChamadoCardDTO[]> {
    return this.http.get<ChamadoCardDTO[]>(`${this.apiUrl}/prioridade?prioridade=${prioridade}`);
  }

  getChamadosByPrioridadeAndStatus(prioridade: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE', status: 'CONCLUIDO'): Observable<ChamadoCardDTO[]> {
    return this.http.get<ChamadoCardDTO[]>(`${this.apiUrl}/prioridade/concluidos?prioridade=${prioridade}&status=${status}`);
  }

  criarChamado(rmUsuario: string, dto: ChamadoRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${rmUsuario}/chamado`, dto);
  }
}
