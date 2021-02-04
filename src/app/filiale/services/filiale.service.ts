import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilialeModel} from '../models/filiale.model';

@Injectable({
  providedIn: 'root'
})
export class FilialeService {
  apiUrl = environment.apiUrl;
  importfilialeEndPoint = '/import_filiale';
  filialeEndPoint = '/filiale';
  deleteEndPoint = '/delete';
  findfilialeEndPoint = '/find_filiale';
  constructor(private http: HttpClient) { }

  getFiliale(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.filialeEndPoint);
  }

  findFiliale(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.filialeEndPoint + '/' + id);
  }

  searchFilialeKeyword(code: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.apiUrl + this.filialeEndPoint + this.findfilialeEndPoint + '/' + code, {headers});
  }

  addFiliale(filiale: FilialeModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.filialeEndPoint, filiale);
  }

  importFiliale(listImportfiliale: FilialeModel[]): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.filialeEndPoint + this.importfilialeEndPoint, listImportfiliale);
  }

  updateFiliale(filiale: FilialeModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.filialeEndPoint + '/' + filiale.id, filiale);
  }

  deleteFiliale(filiale: FilialeModel): Observable<any>{
    return this.http.delete<any>(this.apiUrl + this.filialeEndPoint + '/' + filiale.id);
  }
}
