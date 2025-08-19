import { loginEscolaDTO } from './../../DTOs/loginEscolaDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { escola } from '../../models/escola';
import { tipoPerfil } from '../../models/tipoPerfil';
import { ambiente } from '../../models/ambiente';
import { departamento } from '../../models/departamento';
import { permissao } from '../../models/permissao';
import { tipoChamado } from '../../models/tipoChamado';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { equipamento } from '../../models/equipamento';
import { usuarioRequestDTO } from '../../DTOs/usuarioRequestDTO';
import { usuario } from '../../models/usuario';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { tipoEquipamentoRequestDTO } from '../../DTOs/tipoEquipamentoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { escolaProjection } from '../../DTOs/Projections/escolaProjection';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = 'http://localhost:8080/escolas';

  constructor(private http: HttpClient) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODAwMDEwMCIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0VTQ09MQSJ9XSwiZW50aWRhZGUiOiJFU0NPTEEiLCJpYXQiOjE3NTU2MzM0NzMsImV4cCI6MTc1NTcxOTg3M30.cn5mIMycWFTxvuCmrRdg5rg850AC7iE-3Ej-9E4oLAU';
  // Inserir o Token manualmente para testar

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }


  //login


  getAllEscolas(): Observable<escolaProjection[]>{
    return this.http.get<escolaProjection[]>(this.apiUrl, this.getAuthHeaders());
  }
  getAllTipoPerfil(): Observable<tipoPerfil[]>{
    return this.http.get<tipoPerfil[]>(`${this.apiUrl}/tipoPerfi`, this.getAuthHeaders());
  }

  getAllAmbiente(): Observable<ambiente[]>{
    return this.http.get<ambiente[]>(`${this.apiUrl}/ambiente`, this.getAuthHeaders());
  }

  getAllDepartamento(): Observable<departamentoRequestDTO[]>{
    return this.http.get<departamentoRequestDTO[]>(`${this.apiUrl}/departamento`, this.getAuthHeaders());
  }

  getAllTipoChamado(): Observable<tipoChamado[]>{
    return this.http.get<tipoChamado[]>(`${this.apiUrl}/tipoChamados`, this.getAuthHeaders());
  }

  getAllEquipamento(): Observable<equipamento[]>{
    return this.http.get<equipamento[]>(`${this.apiUrl}/equipamentos`, this.getAuthHeaders());
  }

  //

  getAllPermissaoTipoPerfil(idTipoPerfil: number): Observable<permissao[]>{
    return this.http.get<permissao[]>(`${this.apiUrl}/tipoPerfil/${idTipoPerfil}/permissao`, this.getAuthHeaders());
  }

  getAllTipoEquipamentoAmbiente(idTipoEquipamento: number): Observable<tipoEquipamento[]>{
    return this.http.get<tipoEquipamento[]>(`${this.apiUrl}/tipoPerfil/${idTipoEquipamento}/permissao`, this.getAuthHeaders());
  }


  //MÉTODOS CRIAÇÃO/CADASTRO -------------

  cadastrarUsuario(dto: usuarioRequestDTO): Observable<any>{
    return this.http.post<usuario>(`${this.apiUrl}/usuario`, dto, this.getAuthHeaders());
  }

  cadastrarTipoPerfil(dto:tipoPerfilRequestDTO ): Observable<any>{
    return this.http.post<tipoPerfil>(`${this.apiUrl}/tipoPerfil`, dto, this.getAuthHeaders());
  }

  cadastrarAmbiente(dto: ambienteRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }

  criarTipoChamado(dto: tipoChamadoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }

  criarDepartamento(dto: departamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }
  criarTipoEquipamento(dto: tipoEquipamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }
  cadastrarEquipamento(dto: equipamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }

  //MÉTODOS DE ATRIBUIÇÃO -------------

  atribuirPermissoesTipoPerfil(idTipoPerfil: number): Observable<permissao[]>{
    return this.http.put<permissao[]>(`${this.apiUrl}/tipoPerfil/${idTipoPerfil}/permissao`, this.getAuthHeaders());
  }

  atribuirTipoEquipamentoAmbiente(idAmbiente: number): Observable<tipoEquipamento[]>{
    return this.http.put<tipoEquipamento[]>(`${this.apiUrl}/ambiente/${idAmbiente}/tipoEquipamento`, this.getAuthHeaders());
  }

  //MÉTODOS DE EDIÇÃO -------------

  editarTipoPerfil(idTipoPerfil: number): Observable<tipoPerfil>{
    return this.http.put<tipoPerfil>(`${this.apiUrl}/tipoPerfil/${idTipoPerfil}`, this.getAuthHeaders());
  }

  editarDepartamento(idDepartamento: number): Observable<departamento>{
    return this.http.put<departamento>(`${this.apiUrl}/tipoPerfil/${idDepartamento}`, this.getAuthHeaders());
  }

  editarTipoEquipamento(idTipoEquipamento: number): Observable<tipoEquipamento>{
    return this.http.put<tipoEquipamento>(`${this.apiUrl}/tipoEquipamento/${idTipoEquipamento}`, this.getAuthHeaders());
  }

  editarEquipamento(idEquipamento: number): Observable<equipamento>{
    return this.http.put<equipamento>(`${this.apiUrl}/tipoPerfil/${idEquipamento}`, this.getAuthHeaders());
  }

  editarTipoChamado(idTipoChamado: number): Observable<tipoChamado>{
    return this.http.put<tipoChamado>(`${this.apiUrl}/tipoChamado/${idTipoChamado}`, this.getAuthHeaders());
  }

  editarAmbiente(idAmbiente: number){
    return this.http.put<ambiente>(`${this.apiUrl}/ambiente/${idAmbiente}`, this.getAuthHeaders());
  }
}

