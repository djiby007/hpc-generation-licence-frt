import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ForgotPasswordModel} from '../models/forgot-password.model';
import {AuthModel} from '../models/auth.model';
import {ResetModel} from '../models/reset.model';
import {UpdateModel} from '../models/update.model';
import { UserModel } from 'src/app/user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: UserModel;
  private _user = new BehaviorSubject<UserModel>(null);
  user$: Observable<UserModel> = this._user.asObservable();
  apiUrl = environment.apiUrl;
  loginEndPoint = '/login';
  authenticateEndPoint = '/authenticate';
  logoutEndPoint = '/logout';
  connectUserEndPoint = '/user/details';
  forgotPasswordEndPoint = '/forgot-password';
  resetPasswordEndPoint = '/reset-password';
  updatePasswordEndPoint = '/user/updatePassword';
  headers: HttpHeaders;
  JWT_TOKEN = 'JWT_TOKEN';
  username = 'username';

  constructor(private http: HttpClient) {}

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  getUser(username: string): Observable<any> {
    return this.http.get<UserModel>(this.apiUrl + this.connectUserEndPoint + '/' + username);
  }

  login(auth: AuthModel): Observable<any>  {
    return this.http.post<any>(this.apiUrl + this.authenticateEndPoint, auth)
      .pipe(map(data => {
        localStorage.setItem(this.JWT_TOKEN, data.data.jwt);
        localStorage.setItem(this.username, auth.login);
        return;
      }));
  }

  logout(): Observable<any> {
   localStorage.removeItem(this.JWT_TOKEN);
   localStorage.removeItem(this.username);
   this.currentUser = null;
   return this.http.post<any>(this.apiUrl + this.logoutEndPoint, null);
  }

  forgotPassword(forgot: ForgotPasswordModel){
    return this.http.post<any>(this.apiUrl + this.forgotPasswordEndPoint, forgot);

  }

  resetPassword(reset: ResetModel){
    return this.http.post<any>(this.apiUrl + this.resetPasswordEndPoint, reset);
  }

  updatePassword(update: UpdateModel) {
    return this.http.post<any>(this.apiUrl + this.updatePasswordEndPoint, update);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token != null) {
      return true;
    }
    return false;
  }
}
