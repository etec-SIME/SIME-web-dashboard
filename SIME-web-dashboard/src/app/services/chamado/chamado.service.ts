import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';
  
  constructor( private http: HttpClient ) { }

  getAllChamados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
