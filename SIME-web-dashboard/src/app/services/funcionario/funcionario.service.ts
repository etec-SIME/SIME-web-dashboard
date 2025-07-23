import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { usuarioProjection } from '../../DTOs/Projections/usuarioProjection';
import { chamadoProjection } from '../../DTOs/Projections/chamadoProjection';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private apiUrl = 'http://localhost:8081/funcionarios';
  
  constructor( private http: HttpClient ) { }

  token : String = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTYiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQWRtaW4ifSx7ImF1dGhvcml0eSI6IlZpc3VhbGl6YXIgQ2hhbWFkbyJ9LHsiYXV0aG9yaXR5IjoiRWRpdGFyIENoYW1hZG8ifSx7ImF1dGhvcml0eSI6IkNyaWFyIENoYW1hZG8ifV0sImlhdCI6MTc1MzI5MDg5MiwiZXhwIjoxNzUzMzc3MjkyfQ.31Kdo9w6XZNeGjuVOeF_c6smTPIc29TMAGX_ac8YmHI';
    // Inserir o Token manualmente para testar

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  getAllFuncionarios(): Observable<usuarioProjection[]> {
    //console.log('[FuncionariosService] Token usado:', token);

    return this.http.get<usuarioProjection[]>(this.apiUrl, this.getAuthHeaders());
  }

  getAllChamadosPendentes(): Observable<chamadoProjection[]>{
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/pendentes`, this.getAuthHeaders());
  }

  getAllChamadosConcluidos(): Observable<chamadoProjection[]> {
    return this.http.get<chamadoProjection[]>(`${this.apiUrl}/concluidos`, this.getAuthHeaders());
  }

}
