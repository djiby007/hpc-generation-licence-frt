import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CityModel} from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl = environment.apiUrl;
  importCityEndPoint = '/import_city';
  cityEndPoint = '/city';
  deleteEndPoint = '/delete';
  findCityEndPoint = '/find_city';
  constructor(private http: HttpClient) { }

  getCity(): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('JWT_TOKEN'));
    return this.http.get<any>(this.apiUrl + this.cityEndPoint, {headers});
  }

  findCity(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.cityEndPoint + '/' + id);
  }

  searchCityKeyword(code: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this.apiUrl + this.cityEndPoint + this.findCityEndPoint + '/' + code, {headers});
  }

  addCity(city: CityModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.cityEndPoint, city);
  }

  importCity(listImportCity: CityModel[]): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.cityEndPoint + this.importCityEndPoint, listImportCity);
  }

  updateCity(city: CityModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.cityEndPoint + '/' + city.id, city);
  }

  deleteCity(city: CityModel): Observable<any>{
    return this.http.delete<any>(this.apiUrl + this.cityEndPoint + '/' + city.id);
  }
}
