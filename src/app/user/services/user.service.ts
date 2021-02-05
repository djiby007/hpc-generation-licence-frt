import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  frontUrl = environment.frontUrl;
  importUserEndPoint = '/import_users';
  userEndPoint = '/user';
  userDetailEndPoint = '/details';
  deleteEndPoint = '/delete';
  findUserEndPoint = '/find_user';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.userEndPoint);
  }

  findUser(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl + this.userEndPoint + '/' + id);
  }

  searchUserKeyword(code: string): Observable<UserModel[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<UserModel[]>(this.apiUrl + this.userEndPoint + this.findUserEndPoint + '/' + code, {headers});
  }

  addUser(user: UserModel): Observable<any>{
    return this.http.post<any>(this.apiUrl + this.userEndPoint, {user, frontUrl: this.frontUrl});
  }

  importUser(listImportUser: UserModel[]): Observable<UserModel[]>{
    return this.http.post<UserModel[]>(this.apiUrl + this.userEndPoint + this.importUserEndPoint, listImportUser);
  }

  updateUser(user: UserModel): Observable<any>{
    return this.http.put<any>(this.apiUrl + this.userEndPoint + '/' + user.id, user);
  }

  deleteUser(user: UserModel): Observable<UserModel>{
    return this.http.delete<UserModel>(this.apiUrl + this.userEndPoint + this.deleteEndPoint + '/' + user.id);
  }

  findUserByUsername(username: string): Observable<UserModel>{
    return this.http.get<UserModel>(this.apiUrl + this.userEndPoint + this.userDetailEndPoint + '/' + username);
  }
}
