import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';

@Injectable({ providedIn: 'root' })
export class GestorGeralService {
  private apiUrl = 'http://localhost:8080/gestor-geral';

  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamadoProjection[]>{
    return this.http.get<chamadoProjection[]>(this.apiUrl);
  }

  definirPrioridadeChamado(rmGestor: string, idChamado: number, novaPrioridade: PrioridadeChamadoEnum): void {
    //
  }

  aceitarChamado(idChamado: number): void {

  }

  recusarChamado(idChamado: number, msgRecusa: string): string | null {
    return msgRecusa;
  }

}
