import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LicenceDtoModel} from '../models/licenceDto.model';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  apiUrl = environment.apiUrl;
  licenceEndPoint = '/licence';
  Listeners = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getAllLicence(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + this.licenceEndPoint);
  }

  addLicence(licenceDto: LicenceDtoModel): Observable<any>{
    return this.httpClient.post<any>(this.apiUrl + this.licenceEndPoint, licenceDto);
  }

  listen(): Observable<any>{
    return this.Listeners.asObservable();
  }
}
