import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigurationModel} from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  apiUrl = environment.apiUrl;
  configurationEndPoint = '/configuration';
  deleteConfigEndPoint = '/delete/';

  constructor(private httpClient: HttpClient) { }

  getConfigList(): Observable<ConfigurationModel[]> {
    return this.httpClient.get<ConfigurationModel[]>(this.apiUrl + this. configurationEndPoint);
  }

  saveConfig(config: ConfigurationModel): Observable<ConfigurationModel> {
    return this.httpClient.post<ConfigurationModel>(this.apiUrl + this.configurationEndPoint, config);
  }

  deleteConfig(id: number, config: ConfigurationModel){
    return this.httpClient.put(this.apiUrl + this.configurationEndPoint + this.deleteConfigEndPoint + id, config);
  }
}
