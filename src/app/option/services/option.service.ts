import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OptionModel} from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  apiUrl = environment.apiUrl;
  optionEndPoint = '/option';
  getActiveOptionEndPoint = '/actives';
  deleteOptionEndPoint = '/delete/';

  constructor(private httpClient: HttpClient) { }

  getOptionList(): Observable<OptionModel[]> {
    return this.httpClient.get<OptionModel[]>(this.apiUrl + this.optionEndPoint);
  }

  getActiveOptionList(): Observable<OptionModel[]> {
    return this.httpClient.get<OptionModel[]>(this.apiUrl + this.optionEndPoint + this.getActiveOptionEndPoint);
  }

  saveOption(option: OptionModel): Observable<OptionModel> {
    return this.httpClient.post<OptionModel>(this.apiUrl + this.optionEndPoint, option);
  }

  deleteOption(id: number, option: OptionModel){
    return this.httpClient.put(this.apiUrl + this.optionEndPoint + this.deleteOptionEndPoint + id, option);
  }

}
