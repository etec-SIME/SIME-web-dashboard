import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../../models/usuario';
import { chamado } from '../../models/chamado';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';

@Injectable({providedIn: 'root'})
export class GestorDepartamentoService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor( private http: HttpClient ) { }

  getUsuariosByTipoPerfilAndDepartamento(departamentoId: number, idTipoPerfil: number): Observable<usuario[]> {
    const params = new HttpParams()
      .set('departamentoId', departamentoId)
      .set('idTipoPerfil', idTipoPerfil);
    return this.http.get<usuario[]>(this.apiUrl, { params });
  }
visualizarChamadosDepartamento(rmGestor: string): Observable<chamado[]> {
    return this.http.get<chamado[]>(`${this.apiUrl}/gestores/${rmGestor}/chamados`);
  }

  enviarFeedback(rmGestor: string, idChamado: number, descricaoFeedback: string): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/feedback`,
      descricaoFeedback
    );
  }

  definirPrioridadeChamado(
    rmGestor: string,
    idChamado: number,
    novaPrioridade: PrioridadeChamadoEnum
  ): Observable<void> {
    const params = new HttpParams().set('novaPrioridade', novaPrioridade);
    return this.http.put<void>(
      `${this.apiUrl}/gestores/${rmGestor}/chamados/${idChamado}/prioridade`,
      {},
      { params }
    );
  }
}
