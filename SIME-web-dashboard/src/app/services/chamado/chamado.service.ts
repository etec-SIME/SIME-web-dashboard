import { chamadoProjection } from './../../DTOs/Projections/chamadoProjection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { chamadosAmbienteDTO } from '../../DTOs/chamadosAmbienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';

  constructor( private http: HttpClient ) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODAwMDE5NSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0VTQ09MQSJ9XSwiZW50aWRhZGUiOiJFU0NPTEEiLCJpYXQiOjE3NjEwNTc4NzksImV4cCI6MTc2MTE0NDI3OX0.T7DpqufQy85mMZ8PGN7Bi0d4rXV1kBimOFp2Y0Gq498';
  // Inserir o Token manualmente para testar

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  getAllChamados(): Observable<ChamadoRequestDTO[]> { // mudar de chamadoProjetcion para ChamadoRequestDTO
    return this.http.get<ChamadoRequestDTO[]>(this.apiUrl, this.getAuthHeaders());
  }

  getAllChamadosPorAmbiente(): Observable<chamadosAmbienteDTO[]> { // mudar de chamadoProjetcion para ChamadoRequestDTO
    return this.http.get<chamadosAmbienteDTO[]>(this.apiUrl, this.getAuthHeaders());
  }

  getChamadosByPrioridade(prioridade: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE'): Observable<ChamadoCardDTO[]> {
    return this.http.get<ChamadoCardDTO[]>(`${this.apiUrl}/prioridade?prioridade=${prioridade}`);
  }

  getChamadosByPrioridadeAndStatus(prioridade: 'ALTA_PRIORIDADE' | 'MEDIA_PRIORIDADE' | 'BAIXA_PRIORIDADE', status: 'CONCLUIDO'): Observable<ChamadoCardDTO[]> {
    return this.http.get<ChamadoCardDTO[]>(`${this.apiUrl}/prioridade/concluidos?prioridade=${prioridade}&status=${status}`, { withCredentials: true });
  }

  getAmbienteChamadoSelect(): Observable<AmbienteSelectDTO[]> {
    return this.http.get<AmbienteSelectDTO[]>(`${this.apiUrl}/ambientes`, { withCredentials: true });
  }

  getTipoChamadoSelect(): Observable<TipoChamadoSelectDTO[]> {
    return this.http.get<TipoChamadoSelectDTO[]>(`${this.apiUrl}/tipos-chamado`, { withCredentials: true });
  }

  criarChamado(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar-chamado`, formData, { withCredentials: true });
  }
}
