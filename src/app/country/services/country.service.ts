import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryModel} from '../models/country.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl = environment.apiUrl;
  importCountryEndPoint = '/import_country';
  countryEndPoint = '/country';
  deleteEndPoint = '/';
  findCountryEndPoint = '/find_country';
  constructor(private http: HttpClient) { }

  getCountry(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.countryEndPoint);
  }

  findCountry(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.countryEndPoint + '/' + id);
  }

  searchCountryKeyword(code: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.apiUrl + this.countryEndPoint + this.findCountryEndPoint + '/' + code, {headers});
  }

  addCountry(country: CountryModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.countryEndPoint, country);
  }

  importCountry(listImportCountry: CountryModel[]): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.countryEndPoint + this.importCountryEndPoint, listImportCountry);
  }

  updateCountry(country: CountryModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.countryEndPoint + '/' + country.id, country);
  }

  deleteCountry(country: CountryModel): Observable<any>{
    return this.http.delete<any>(this.apiUrl + this.countryEndPoint + '/' + country.id);
  }
}
