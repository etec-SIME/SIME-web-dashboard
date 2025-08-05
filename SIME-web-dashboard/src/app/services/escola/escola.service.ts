import { loginEscolaDTO } from './../../DTOs/loginEscolaDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { escola } from '../../models/escola';
import { tipoPerfil } from '../../models/tipoPerfil';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = 'http://localhost:8080/escolas';

  constructor(private http: HttpClient) { }

  token : String = 'token';
  // Inserir o Token manualmente para testar

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  getAllEscola(): Observable<escola[]>{
    return this.http.get<escola[]>(this.apiUrl)
  }

  //login

  //loginEscola(dto: loginEscolaDTO): Observable<any>{
  //}
  
  getAllTipoPerfil(): Observable<tipoPerfil[]>{
    return this.http.get<tipoPerfil[]>(this.apiUrl);
  }


}
