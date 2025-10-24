import { chamadoProjection } from './../../DTOs/Projections/chamadoProjection';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { ChamadoResponseDTO } from '../../DTOs/ChamadoResponseDTO';
import { ChamadoRequestDTO } from '../../DTOs/chamadoRequestDTO';
import { ChamadoStatusResponseDTO } from '../../DTOs/ChamadoStatusResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';

  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<ChamadoRequestDTO[]> {
    return this.http.get<ChamadoRequestDTO[]>(this.apiUrl);
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

  getDetalheChamado(id: number): Observable<ChamadoResponseDTO> {
    return this.http.get<ChamadoResponseDTO>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getStatusChamado(id: number): Observable<ChamadoStatusResponseDTO> {
    return this.http.get<ChamadoStatusResponseDTO>(`${this.apiUrl}/${id}/status`, { withCredentials: true });
  }

  atualizarStatusGeral(id: number, novoStatus: string): Observable<ChamadoStatusResponseDTO> {
    const param = new HttpParams().set('novoStatus', novoStatus);

    return this.http.put<ChamadoStatusResponseDTO>(`${this.apiUrl}/${id}/atualizar-status-geral`, {}, { params: param, withCredentials: true });
  }

  atualizarStatusProgresso(id: number, novoStatusProgresso: string): Observable<ChamadoStatusResponseDTO> {
    const param = new HttpParams().set('novoStatus', novoStatusProgresso);
    return this.http.put<ChamadoStatusResponseDTO>(`${this.apiUrl}/${id}/atualizar-status-progresso`, {}, { params: param, withCredentials: true });
  }
}
