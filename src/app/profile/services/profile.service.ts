import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import {ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.apiUrl;
  profileEndPoint = '/profile';
  getActiveProfileEndPoint = '/actives';
  deleteProfileEndPoint = '/delete/';
  Listeners = new Subject<any>();
  currentProfile: ProfileModel;
  constructor(private httpClient: HttpClient) { }

  saveProfile(profile: any): Observable<ProfileModel> {
    return this.httpClient.post<ProfileModel>(this.apiUrl + this.profileEndPoint, profile);
  }

  getProfiles(): Observable<ProfileModel[]> {
    return this.httpClient.get<ProfileModel[]>(this.apiUrl + this.profileEndPoint);
  }
  getProfileList(): Observable<ProfileModel[]> {
    return this.httpClient.get<ProfileModel[]>(this.apiUrl + this.profileEndPoint);
  }

  getActiveProfiles(): Observable<ProfileModel[]> {
    return this.httpClient.get<ProfileModel[]>(this.apiUrl + this.profileEndPoint + this.getActiveProfileEndPoint);
  }

  updateProfile(id: number, profile: ProfileModel): Observable<any> {
    return this.httpClient.put(this.apiUrl + this.profileEndPoint + '/' + id, profile);
  }

  deleteProfile(id: number, profile: ProfileModel): Observable<any>{
    return this.httpClient.put(this.apiUrl + this.profileEndPoint + this.deleteProfileEndPoint + id, profile);
  }

  listen(): Observable<any>{
    return this.Listeners.asObservable();
  }

  filter(filterBy: string){
    this.Listeners.next(filterBy);
  }
}
