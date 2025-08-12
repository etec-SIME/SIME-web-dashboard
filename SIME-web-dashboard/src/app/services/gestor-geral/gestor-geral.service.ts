import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';

@Injectable({ providedIn: 'root' })
export class GestorGeralService {
  private apiUrl = 'http://localhost:8080/gestor-geral';

  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamadoProjection[]>{
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/gestores/chamados`);
  }

  definirPrioridadeChamado(rmGestor: string, idChamado: number, novaPrioridade: PrioridadeChamadoEnum): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/prioridade`, {},
      {params: {novaPrioridade}}
    )
  }

  aceitarChamado(rmGestor: string, idChamado: number): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/aceitar`, {})
  }

  recusarChamado(idChamado: number, msgRecusa: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/gestores/{rmGestor}/chamados/{idChamado}/recusar`);
  }

}
