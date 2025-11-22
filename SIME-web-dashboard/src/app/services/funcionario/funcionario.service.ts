import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/funcionarios';

  constructor( private http: HttpClient ) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDAwMDIiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiR2VyZW5jaWFyIFBlcmZpcyJ9LHsiYXV0aG9yaXR5IjoiR2VyZW5jaWFyIERlcGFydGFtZW50b3MifSx7ImF1dGhvcml0eSI6IkdlcmVuY2lhciBDaGFtYWRvcyJ9LHsiYXV0aG9yaXR5IjoiQ3JpYXIgQ2hhbWFkbyJ9LHsiYXV0aG9yaXR5IjoiVmlzdWFsaXphciBSZWxhdMOzcmlvcyJ9XSwiZW50aWRhZGUiOiJVU1VBUklPIiwiaWF0IjoxNzYwMzg3ODkyLCJleHAiOjE3NjA0NzQyOTJ9.lfIIM96zdfVx4hEEqDWzKaW_ML00g7APPPvuKH-Ky08';
    // Inserir o Token manualmente para testar

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  getAllFuncionarios(): Observable<UsuarioProjection[]> {
    //console.log('[FuncionariosService] Token usado:', token);

    return this.http.get<UsuarioProjection[]>(this.apiUrl, this.getAuthHeaders());
  }

  getAllChamadosPendentes(): Observable<chamadoProjection[]>{
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/pendentes`, this.getAuthHeaders());
  }

  getAllChamadosConcluidos(): Observable<chamadoProjection[]> {
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/concluidos`, this.getAuthHeaders());
  }

}
