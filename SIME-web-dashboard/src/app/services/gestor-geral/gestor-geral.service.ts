import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GestorGeralService {
  private apiUrl = environment.apiUrl + '/gestor-geral';
  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamadoProjection[]>{
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/gestores/chamados`);
  }

  definirPrioridadeChamado(rmGestor: string, idChamado: number, novaPrioridade: PrioridadeChamadoEnum): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/prioridade`,
      {},
      { params: { novaPrioridade: novaPrioridade.toString() }}
    );
  }

  aceitarChamado(rmGestor: string, idChamado: number): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/aceitar`, {});
  }

  recusarChamado(rmGestor:string, idChamado: number, msgRecusa: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/recusar`,
      {body: msgRecusa}
    );
  }

}
