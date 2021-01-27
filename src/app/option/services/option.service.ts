import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OptionModel} from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = environment.apiUrl;
  optionEndPoint = '/option';
  getActiveOptionEndPoint = '/actives';
  deleteOptionEndPoint = '/delete/';
  Listeners = new Subject<any>();
  currentOption: OptionModel;

  getOptionList(): Observable<OptionModel[]> {
    return this.httpClient.get<OptionModel[]>(this.apiUrl + this.optionEndPoint);
  }

  getActiveOptionList(): Observable<OptionModel[]> {
    return this.httpClient.get<OptionModel[]>(this.apiUrl + this.optionEndPoint + this.getActiveOptionEndPoint);
  }

  getOptionById(id): Observable<OptionModel>{
    return this.httpClient.get<OptionModel>(this.apiUrl + this.optionEndPoint + '/' + id);
  }

  saveOption(option: OptionModel): Observable<OptionModel> {
    return this.httpClient.post<OptionModel>(this.apiUrl + this.optionEndPoint, option);
  }

  deleteOption(id: number, option: OptionModel): Observable<any>{
    return this.httpClient.put(this.apiUrl + this.optionEndPoint + this.deleteOptionEndPoint + id, option);
  }

  updateOption(id: number, option: OptionModel): Observable<any>{
    return this.httpClient.put(this.apiUrl + this.optionEndPoint + '/' + id, option);
  }

  listen(): Observable<any>{
    return this.Listeners.asObservable();
  }

  filter(filterBy: string){
    this.Listeners.next(filterBy);
  }
}
