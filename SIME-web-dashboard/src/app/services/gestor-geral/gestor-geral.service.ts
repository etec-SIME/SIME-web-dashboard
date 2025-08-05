import { chamado } from './../../models/chamado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';

@Injectable({ providedIn: 'root' })
export class GestorGeralService {
  private apiUrl = 'http://localhost:8080/gestor-geral';

  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<chamado[]>{
    return this.http.get<chamado[]>(`${this.apiUrl}/gestores/chamados`);
  }

  definirPrioridadeChamado(rmGestor: string, idChamado: number, novaPrioridade: PrioridadeChamadoEnum): void {

  }

  aceitarChamado(rmGestor: string, idChamado: number): void {
  }

  recusarChamado(rmGestor: string, idChamado: number, msgRecusa: string): string | null {
    this.http.delete<chamado>(`${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/recusar`);
    return msgRecusa;
  }

}
