import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {PermissionModel} from '../models/permission.model';
import {UpdatePermissionModel} from '../models/updatePermission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  apiUrl = environment.apiUrl;
  permissionEndPoint = '/affectation';
  searchPermissionEndPoint = '/search-profil/';
  searchConfigurationEndPoint = '/getListConfiguration';
  searchListPermissionEndPoint = '/getListPermission';
  editPermissionEndPoint = '/getEditPermission';
  deletePermissionEndPoint = '/getDeletePermission';
  writePermissionEndPoint = '/getWritePermission';
  currentPermission: PermissionModel;

  constructor(private httpClient: HttpClient) {
  }

  savePermission() {
    return this.httpClient.post(this.apiUrl + this.permissionEndPoint, null);
  }

  getPermissionsList(): Observable<PermissionModel[]> {
    return this.httpClient.get<PermissionModel[]>(this.apiUrl + this.permissionEndPoint);
  }

  getPermissions(): Observable<PermissionModel[]> {
    return this.httpClient.get<PermissionModel[]>(this.apiUrl + this.permissionEndPoint);
  }

  getPermissionById(id): Observable<PermissionModel>{
    return this.httpClient.get<PermissionModel>(this.apiUrl + this.permissionEndPoint + '/' + id);
  }

  updatePermission(id: number, affectation: UpdatePermissionModel) {
    return this.httpClient.put(this.apiUrl + this.permissionEndPoint + '/' + id, affectation);
  }

  searchPermissionBykeyword(id): Observable<PermissionModel[]> {
    return this.httpClient.get<PermissionModel[]>(this.apiUrl + this.permissionEndPoint + this.searchPermissionEndPoint + id);
  }

  getListConfiguration(body: HttpParams): Observable<PermissionModel[]> {
    return this.httpClient.post<PermissionModel[]>(this.apiUrl + this.permissionEndPoint + this.searchConfigurationEndPoint, body);
  }

  getListPermission(body: HttpParams): Observable<PermissionModel[]> {
    return this.httpClient.post<PermissionModel[]>(this.apiUrl + this.permissionEndPoint + this.searchListPermissionEndPoint, body);
  }

  getWritePermission(body: HttpParams): Observable<PermissionModel> {
    return this.httpClient.post<PermissionModel>(this.apiUrl + this.permissionEndPoint + this.writePermissionEndPoint, body);
  }

  getEditPermission(body: HttpParams): Observable<PermissionModel> {
    return this.httpClient.post<PermissionModel>(this.apiUrl + this.permissionEndPoint + this.editPermissionEndPoint, body);
  }

  getDeletePermission(body: HttpParams): Observable<PermissionModel> {
    return this.httpClient.post<PermissionModel>(this.apiUrl + this.permissionEndPoint + this.deletePermissionEndPoint, body);
  }
}
