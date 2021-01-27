import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FeatureModel} from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  apiUrl = environment.apiUrl;
  listFeatureEndPoint = '/feature';
  deleteFeatureEndPoint = '/delete/';
  findFeatureEndPoint = '/find_feature';
  importFile = '/import-features';

  constructor(private httpClient: HttpClient) {
  }

  saveFeature(feature: FeatureModel): Observable<FeatureModel> {
    return this.httpClient.post<FeatureModel>(this.apiUrl + this.listFeatureEndPoint, feature);
  }

  getFeatures() {
    return this.httpClient.get<FeatureModel>(this.apiUrl + this.listFeatureEndPoint);
  }

  getFeatureById(id): Observable<FeatureModel> {
    return this.httpClient.get<FeatureModel>(this.apiUrl + this.listFeatureEndPoint + '/' + id);
  }

  updateFeature(id: number, feature: FeatureModel) {
    return this.httpClient.put(this.apiUrl + this.listFeatureEndPoint + '/' + id, feature);
  }

  deleteFeature(id: number, feature: FeatureModel) {
    return this.httpClient.put(this.apiUrl + this.listFeatureEndPoint + this.deleteFeatureEndPoint + id, feature);
  }

  searchFeatureKeyword(codeFeature: any) {
    return this.httpClient.post(this.apiUrl + this.listFeatureEndPoint + this.findFeatureEndPoint, codeFeature);
  }

  ImportFeature(listFeature: FeatureModel[]): Observable<FeatureModel[]> {
    return this.httpClient.post<FeatureModel[]>(this.apiUrl + this.listFeatureEndPoint + this.importFile, listFeature);
  }
}
