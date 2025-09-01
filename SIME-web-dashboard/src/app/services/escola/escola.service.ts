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
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { permissaoTipoPerfilDTO } from '../../DTOs/permissaoTipoPerfilDTO';
import { tipoEquipamentoAmbienteDTO } from '../../DTOs/tipoEquipamentoAmbienteDTO';
import { tipoPerfilProjection } from '../../DTOs/Projections/tipoPerfilProjection';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = 'http://localhost:8080/escolas';

  constructor(private http: HttpClient) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODAwMDEwMCIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0VTQ09MQSJ9XSwiZW50aWRhZGUiOiJFU0NPTEEiLCJpYXQiOjE3NTY3NTkzOTksImV4cCI6MTc1Njg0NTc5OX0.7iRsMwM_t-fk74GRusO7kMdG3bTgWksm4j35lXCxwY0';
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
  
  getAllTipoPerfil(): Observable<tipoPerfilRequestDTO[]>{
    return this.http.get<tipoPerfilRequestDTO[]>(`${this.apiUrl}/tipo-perfil`, this.getAuthHeaders());
  }

  getAllAmbiente(): Observable<ambiente[]>{
    return this.http.get<ambiente[]>(`${this.apiUrl}/ambiente`, this.getAuthHeaders());
  }

  getAllDepartamento(): Observable<departamentoRequestDTO[]>{
    return this.http.get<departamentoRequestDTO[]>(`${this.apiUrl}/departamento`, this.getAuthHeaders());
  }

  getAllTipoChamado(): Observable<tipoChamadoRequestDTO[]>{
    return this.http.get<tipoChamadoRequestDTO[]>(`${this.apiUrl}/tipo-chamado`, this.getAuthHeaders());
  }

  getAllEquipamento(): Observable<equipamentoRequestDTO[]>{
    return this.http.get<equipamentoRequestDTO[]>(`${this.apiUrl}/equipamento`, this.getAuthHeaders());
  }

  getAllTipoEquipamento(): Observable<tipoEquipamento[]>{
    return this.http.get<tipoEquipamento[]>(`${this.apiUrl}/tipo-equipamento`, this.getAuthHeaders());
  }

  getAllTipoAmbiente(): Observable<tipoAmbiente[]>{
    return this.http.get<tipoAmbiente[]>(`${this.apiUrl}/tipo-ambiente`, this.getAuthHeaders());
  }

  getAllPermissaoTipoPerfil(idTipoPerfil: number): Observable<permissao[]>{
    return this.http.get<permissao[]>(`${this.apiUrl}/tipoPerfil/${idTipoPerfil}/permissao`, this.getAuthHeaders());
  }

  getAllTipoEquipamentoAmbiente(idAmbiente: number): Observable<tipoEquipamento[]>{
    return this.http.get<tipoEquipamento[]>(`${this.apiUrl}/ambiente/${idAmbiente}/tipo-equipamento`, this.getAuthHeaders());
  }


  //MÉTODOS CRIAÇÃO/CADASTRO -------------

  cadastrarUsuario(dto: usuarioRequestDTO): Observable<any>{
    return this.http.post<usuario>(`${this.apiUrl}/usuario`, dto, this.getAuthHeaders());
  }

  cadastrarTipoPerfil(dto:tipoPerfilRequestDTO ): Observable<any>{
    return this.http.post<tipoPerfil>(`${this.apiUrl}/tipo-perfil`, dto, this.getAuthHeaders());
  }

  cadastrarAmbiente(dto: ambienteRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/ambiente`, dto, this.getAuthHeaders());
  }

  criarTipoChamado(dto: tipoChamadoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/tipo-chamado`, dto, this.getAuthHeaders());
  }

  criarDepartamento(dto: departamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/departamento`, dto, this.getAuthHeaders());
  }
  criarTipoEquipamento(dto: tipoEquipamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/tipo-equipamento`, dto, this.getAuthHeaders());
  }
  cadastrarEquipamento(dto: equipamentoRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/equipamento`, dto, this.getAuthHeaders());
  }

  criarTipoAmbiente(dto: tipoAmbienteRequestDTO): Observable<any>{
    return this.http.post<ambiente>(`${this.apiUrl}/tipo_ambiente`, dto, this.getAuthHeaders());
  }

  //MÉTODOS DE ATRIBUIÇÃO -------------

  atribuirPermissoesTipoPerfil(idTipoPerfil: number, permissoes: permissaoTipoPerfilDTO): Observable<permissao[]>{
    return this.http.put<permissao[]>(`${this.apiUrl}/tipo-perfil/${idTipoPerfil}/permissao`, permissoes, this.getAuthHeaders());
  }

  atribuirTipoEquipamentoAmbiente(idAmbiente: number, tipoEquipamentos: tipoEquipamentoAmbienteDTO): Observable<tipoEquipamento[]>{
    return this.http.put<tipoEquipamento[]>(`${this.apiUrl}/ambiente/${idAmbiente}/tipo-equipamento`, tipoEquipamentos, this.getAuthHeaders());
  }

  //MÉTODOS DE EDIÇÃO -------------

  editarTipoPerfil(idTipoPerfil: number, tipoPerfilDTO: tipoPerfilRequestDTO): Observable<tipoPerfilProjection>{
    return this.http.put<tipoPerfilProjection>(`${this.apiUrl}/tipo-perfil/${idTipoPerfil}`, tipoPerfilDTO, this.getAuthHeaders());
  }

  editarDepartamento(idDepartamento: number, departamentoDTO: departamentoRequestDTO): Observable<departamento>{
    return this.http.put<departamento>(`${this.apiUrl}/departamento/${idDepartamento}`, departamentoDTO, this.getAuthHeaders());
  }

  editarTipoEquipamento(idTipoEquipamento: number, tipoEquipamentoDTO: tipoEquipamentoRequestDTO): Observable<tipoEquipamento>{
    return this.http.put<tipoEquipamento>(`${this.apiUrl}/tipo-equipamento/${idTipoEquipamento}`, tipoEquipamentoDTO, this.getAuthHeaders());
  }

  editarEquipamento(idEquipamento: number, equipamentoDTO: equipamentoRequestDTO): Observable<equipamento>{
    return this.http.put<equipamento>(`${this.apiUrl}/equipamento/${idEquipamento}`, equipamentoDTO, this.getAuthHeaders());
  }

  editarTipoChamado(idTipoChamado: number, tipoChamadoDTO: tipoChamadoRequestDTO): Observable<tipoChamado>{
    return this.http.put<tipoChamado>(`${this.apiUrl}/tipo-chamado/${idTipoChamado}`, tipoChamadoDTO, this.getAuthHeaders());
  }

  editarAmbiente(idAmbiente: number, ambienteDTO: ambienteRequestDTO){
    return this.http.put<ambiente>(`${this.apiUrl}/ambiente/${idAmbiente}`, ambienteDTO, this.getAuthHeaders());
  }

  editarTipoAmbiente(idTipoAmbiente: number, tipoAmbienteDTO: tipoAmbienteRequestDTO){
    return this.http.put<tipoAmbiente>(`${this.apiUrl}/tipo-ambiente/${idTipoAmbiente}`, tipoAmbienteDTO, this.getAuthHeaders());
  }

  editarUsuario(idUsuario: number, usuarioDTO: usuarioRequestDTO){
    return this.http.put<usuario>(`${this.apiUrl}/usuario/${idUsuario}`, usuarioDTO, this.getAuthHeaders());
  }

}

