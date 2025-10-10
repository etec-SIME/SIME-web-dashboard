import { chamadoProjection } from './../../DTOs/Projections/chamadoProjection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoCardDTO } from '../../DTOs/ChamadoCardDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';

  constructor( private http: HttpClient ) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDAwMDIiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiR2VyZW5jaWFyIFBlcmZpcyJ9LHsiYXV0aG9yaXR5IjoiR2VyZW5jaWFyIERlcGFydGFtZW50b3MifSx7ImF1dGhvcml0eSI6IkdlcmVuY2lhciBDaGFtYWRvcyJ9LHsiYXV0aG9yaXR5IjoiQ3JpYXIgQ2hhbWFkbyJ9LHsiYXV0aG9yaXR5IjoiVmlzdWFsaXphciBSZWxhdMOzcmlvcyJ9XSwiZW50aWRhZGUiOiJVU1VBUklPIiwiaWF0IjoxNzU5OTI5NzYzLCJleHAiOjE3NjAwMTYxNjN9.RVEZadx1FOHiaqYIhGjf1Z_SC89qvdaUzZhffntm714';
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
