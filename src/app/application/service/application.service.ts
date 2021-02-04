import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationModel} from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  apiUrl = environment.apiUrl;
  importApplicationEndPoint = '/import_application';
  applicationEndPoint = '/application';
  deleteEndPoint = '/delete';
  findApplicationEndPoint = '/find_application';
  constructor(private http: HttpClient) { }

  getApplication(): Observable<any>{
   return this.http.get<any>(this.apiUrl + this.applicationEndPoint);
  }

  getConfigApplicationList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.applicationEndPoint);
  }

  findApplication(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.applicationEndPoint + '/' + id);
  }

  searchApplicationKeyword(code: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.apiUrl + this.applicationEndPoint + this.findApplicationEndPoint + '/' + code, {headers});
  }

  addApplication(application: ApplicationModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.applicationEndPoint, application);
  }

  importApplication(listImportApplication: ApplicationModel[]): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.applicationEndPoint + this.importApplicationEndPoint, listImportApplication);
  }

  updateApplication(application: ApplicationModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.applicationEndPoint + '/' + application.id, application);
  }

  deleteApplication(application: ApplicationModel): Observable<any>{
    return this.http.delete<any>(this.apiUrl + this.applicationEndPoint + '/' + application.id);
  }
}
