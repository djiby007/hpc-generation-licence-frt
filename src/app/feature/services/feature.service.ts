import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FeatureModel} from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  apiUrl = environment.apiUrl;
  listFeatureEndPoint = '/feature';
  Listeners = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  saveFeature(feature: FeatureModel): Observable<FeatureModel> {
    return this.httpClient.post<FeatureModel>(this.apiUrl + this.listFeatureEndPoint, feature);
  }

  getFeatures(): Observable<FeatureModel[]>  {
    return this.httpClient.get<FeatureModel[]>(this.apiUrl + this.listFeatureEndPoint);
  }

  getFeatureList(): Observable<FeatureModel[]> {
    return this.httpClient.get<FeatureModel[]>(this.apiUrl + this.listFeatureEndPoint);
  }

  listen(): Observable<any>{
    return this.Listeners.asObservable();
  }

  filter(filterBy: string){
    this.Listeners.next(filterBy);
  }
}
