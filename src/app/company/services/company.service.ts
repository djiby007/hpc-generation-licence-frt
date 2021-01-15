import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyModel} from '../models/company.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = environment.apiUrl;
  importCompanyEndPoint = '/import_company';
  companyEndPoint = '/company';
  deleteEndPoint = '/delete';
  findCompanyEndPoint = '/find_company';
  constructor(private http: HttpClient) { }

  getCompany(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.companyEndPoint);
  }

  findCompany(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.companyEndPoint + '/' + id);
  }

  searchCompanyKeyword(code: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.apiUrl + this.companyEndPoint + this.findCompanyEndPoint + '/' + code, {headers});
  }

  addCompany(company: CompanyModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.companyEndPoint, company);
  }

  importCompany(listImportCompany: CompanyModel[]): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.companyEndPoint + this.importCompanyEndPoint, listImportCompany);
  }

  updateCompany(company: CompanyModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.companyEndPoint + '/' + company.id, company);
  }

  deleteCompany(company: CompanyModel): Observable<any>{
    return this.http.delete<any>(this.apiUrl + this.companyEndPoint + '/' + company.id);
  }
}
