import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContinentModel} from '../models/continent.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {
  apiUrl = environment.apiUrl;
  importContinentEndPoint = '/import_continent';
  continentEndPoint = '/continent';
  deleteEndPoint = '/delete';
  findContinentEndPoint = '/find_continent';
  constructor(private http: HttpClient) { }

  getContinent(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.continentEndPoint);
  }

  findContinent(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.continentEndPoint + '/' + id);
  }

  searchContinentKeyword(code: string): Observable<ContinentModel[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ContinentModel[]>(this.apiUrl + this.continentEndPoint + this.findContinentEndPoint + '/' + code, {headers});
  }

  addContinent(continent: ContinentModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.continentEndPoint, continent);
  }

  importContinent(listImportContinent: ContinentModel[]): Observable<ContinentModel[]>{
    return this.http.post<ContinentModel[]>(this.apiUrl + this.continentEndPoint + this.importContinentEndPoint, listImportContinent);
  }

  updateContinent(continent: ContinentModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.continentEndPoint + '/' + continent.id, continent);
  }

  deleteContinent(continent: ContinentModel): Observable<ContinentModel>{
    return this.http.delete<ContinentModel>(this.apiUrl + this.continentEndPoint + this.deleteEndPoint + '/' + continent.id);
  }
}
