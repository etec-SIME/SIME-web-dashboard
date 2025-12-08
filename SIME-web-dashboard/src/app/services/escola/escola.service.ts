import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoPerfil } from '../../models/tipoPerfil';
import { departamento } from '../../models/departamento';
import { permissao } from '../../models/permissao';
import { tipoChamado } from '../../models/tipoChamado';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { equipamento } from '../../models/equipamento';
import { usuarioRequestDTO } from '../../DTOs/usuarioRequestDTO';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { tipoEquipamentoRequestDTO } from '../../DTOs/tipoEquipamentoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { escolaProjection } from '../../DTOs/Projections/escolaProjection';
import { tipoAmbiente } from '../../models/tipoAmbiente';
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { PermissaoTipoPerfilRequestDTO } from '../../DTOs/PermissaoTipoPerfilRequestDTO';
import { tipoEquipamentoAmbienteDTO } from '../../DTOs/tipoEquipamentoAmbienteDTO';
import { tipoPerfilProjection } from '../../DTOs/Projections/tipoPerfilProjection';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoPerfilPermissoesResponseDTO } from '../../DTOs/TipoPerfilPermissoesResponseDTO';
import { codEquipamentoResponseDTO } from '../../DTOs/codEquipamentoResponseDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = environment.apiUrl + '/escola';

  constructor(private http: HttpClient) { }

  getAllEscolas(): Observable<escolaProjection[]>{
    return this.http.get<escolaProjection[]>(this.apiUrl);
  }

  getAllTipoPerfil(): Observable<tipoPerfilRequestDTO[]>{
    return this.http.get<tipoPerfilRequestDTO[]>(`${this.apiUrl}/tipo-perfil`);
  }

  getAllAmbiente(): Observable<AmbienteSelectDTO[]>{
    return this.http.get<AmbienteSelectDTO[]>(`${this.apiUrl}/ambiente`);
  }

  getAllDepartamento(): Observable<departamentoRequestDTO[]>{
    return this.http.get<departamentoRequestDTO[]>(`${this.apiUrl}/departamento`);
  }

  getAllTipoChamadoDepartamento(): Observable<tipoChamadoRequestDTO[]>{
    return this.http.get<tipoChamadoRequestDTO[]>(`${this.apiUrl}/tipo-chamado`);
  }

  getAllTipoChamado(): Observable<TipoChamadoSelectDTO[]>{
    return this.http.get<TipoChamadoSelectDTO[]>(`${this.apiUrl}/tipo-chamado`);
  }

  getAllTipoChamadoRequest() {
  return this.http.get<tipoChamadoRequestDTO[]>(`${this.apiUrl}/tipo-chamado`);
}

  getAllEquipamento(): Observable<equipamentoRequestDTO[]>{
    return this.http.get<equipamentoRequestDTO[]>(`${this.apiUrl}/equipamento`);
  }

  getAllTipoEquipamento(): Observable<tipoEquipamento[]>{
    return this.http.get<tipoEquipamento[]>(`${this.apiUrl}/tipo-equipamento`);
  }

  getAllTipoAmbiente(): Observable<tipoAmbiente[]>{
    return this.http.get<tipoAmbiente[]>(`${this.apiUrl}/tipo-ambiente`);
  }

  getAllPermissoes(): Observable<permissao[]>{
    return this.http.get<permissao[]>(`${this.apiUrl}/permissoes`);
  }

  getAllPermissaoTipoPerfil(idTipoPerfil: number): Observable<permissao[]>{
    return this.http.get<permissao[]>(`${this.apiUrl}/tipo-perfil/${idTipoPerfil}/permissoes`);
  }

  getTipoPerfilPermissoes(): Observable<TipoPerfilPermissoesResponseDTO[]>{
    return this.http.get<TipoPerfilPermissoesResponseDTO[]>(`${this.apiUrl}/tipo-perfil/permissoes`);
  }

  getAllTipoEquipamentoAmbiente(idAmbiente: number): Observable<tipoEquipamento[]>{
    return this.http.get<tipoEquipamento[]>(`${this.apiUrl}/ambiente/${idAmbiente}/tipo-equipamento`);
  }

  getAllEquipamentosSemAmbiente(): Observable<codEquipamentoResponseDTO[]>{
    return this.http.get<codEquipamentoResponseDTO[]>(`${this.apiUrl}/equipamento/sem-ambiente`);
  }

  //MÉTODOS CRIAÇÃO/CADASTRO -------------

  cadastrarUsuario(dto: usuarioRequestDTO): Observable<any>{
    return this.http.post<usuarioRequestDTO>(`${this.apiUrl}/usuario`, dto);
  }

  cadastrarTipoPerfil(dto: tipoPerfilRequestDTO): Observable<any>{
    return this.http.post<tipoPerfil>(`${this.apiUrl}/tipo-perfil`, dto);
  }

  cadastrarAmbiente(dto: ambienteRequestDTO): Observable<any>{
    return this.http.post<ambienteRequestDTO>(`${this.apiUrl}/ambiente`, dto);
  }

  criarTipoChamado(dto: tipoChamadoRequestDTO): Observable<any>{
    return this.http.post<tipoChamadoRequestDTO>(`${this.apiUrl}/tipo-chamado`, dto);
  }

  criarDepartamento(dto: departamentoRequestDTO): Observable<any>{
    return this.http.post<departamento>(`${this.apiUrl}/departamento`, dto);
  }

  criarTipoEquipamento(dto: tipoEquipamentoRequestDTO): Observable<any>{
    return this.http.post<tipoEquipamento>(`${this.apiUrl}/tipo-equipamento`, dto);
  }

  cadastrarEquipamento(dto: equipamentoRequestDTO): Observable<any>{
    return this.http.post<equipamentoRequestDTO>(`${this.apiUrl}/equipamento`, dto);
  }

  criarTipoAmbiente(dto: tipoAmbienteRequestDTO): Observable<any>{
    return this.http.post<tipoAmbienteRequestDTO>(`${this.apiUrl}/tipo-ambiente`, dto);
  }

  //MÉTODOS DE ATRIBUIÇÃO -------------

  atribuirPermissoesTipoPerfil(idTipoPerfil: number, permissoes: PermissaoTipoPerfilRequestDTO): Observable<permissao[]>{
    return this.http.put<permissao[]>(`${this.apiUrl}/tipo-perfil/${idTipoPerfil}/permissao`, permissoes);
  }

  atribuirTipoEquipamentoAmbiente(idAmbiente: number, tipoEquipamentos: tipoEquipamentoAmbienteDTO): Observable<tipoEquipamento[]>{
    return this.http.put<tipoEquipamento[]>(`${this.apiUrl}/ambiente/${idAmbiente}/tipo-equipamento`, tipoEquipamentos);
  }

  //MÉTODOS DE EDIÇÃO -------------

  editarTipoPerfil(idTipoPerfil: number, tipoPerfilDTO: tipoPerfilRequestDTO): Observable<tipoPerfilProjection>{
    return this.http.put<tipoPerfilProjection>(`${this.apiUrl}/tipo-perfil/${idTipoPerfil}`, tipoPerfilDTO);
  }

  editarDepartamento(idDepartamento: number, departamentoDTO: departamentoRequestDTO): Observable<departamento>{
    return this.http.put<departamento>(`${this.apiUrl}/departamento/${idDepartamento}`, departamentoDTO);
  }

  editarTipoEquipamento(idTipoEquipamento: number, tipoEquipamentoDTO: tipoEquipamentoRequestDTO): Observable<tipoEquipamento>{
    return this.http.put<tipoEquipamento>(`${this.apiUrl}/tipo-equipamento/${idTipoEquipamento}`, tipoEquipamentoDTO);
  }

  editarEquipamento(idEquipamento: number, equipamentoDTO: equipamentoRequestDTO): Observable<equipamento>{
    return this.http.put<equipamento>(`${this.apiUrl}/equipamento/${idEquipamento}`, equipamentoDTO);
  }

  editarTipoChamado(idTipoChamado: number, tipoChamadoDTO: tipoChamadoRequestDTO): Observable<tipoChamado>{
    return this.http.put<tipoChamado>(`${this.apiUrl}/tipo-chamado/${idTipoChamado}`, tipoChamadoDTO);
  }

  editarAmbiente(idAmbiente: number, ambienteDTO: ambienteRequestDTO){
    return this.http.put<ambienteRequestDTO>(`${this.apiUrl}/ambiente/${idAmbiente}`, ambienteDTO);
  }

  editarTipoAmbiente(idTipoAmbiente: number, tipoAmbienteDTO: tipoAmbienteRequestDTO){
    return this.http.put<tipoAmbiente>(`${this.apiUrl}/tipo-ambiente/${idTipoAmbiente}`, tipoAmbienteDTO);
  }
}

