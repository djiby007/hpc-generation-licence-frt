import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
  findProfileEndPoint = '/find_profile';
  constructor(private httpClient: HttpClient) { }

  saveProfile(profile: any): Observable<ProfileModel> {
    return this.httpClient.post<ProfileModel>(this.apiUrl + this.profileEndPoint, profile);
  }

  getProfiles(): Observable<ProfileModel[]> {
    return this.httpClient.get<ProfileModel[]>(this.apiUrl + this.profileEndPoint);
  }

  getActiveProfiles(): Observable<ProfileModel[]> {
    return this.httpClient.get<ProfileModel[]>(this.apiUrl+this.profileEndPoint+this.getActiveProfileEndPoint);
  }

  getProfileById(id): Observable<ProfileModel>{
    return this.httpClient.get<ProfileModel>(this.apiUrl + this.profileEndPoint + '/' + id);
  }

  updateProfile(id: number, profile: ProfileModel) {
    return this.httpClient.put(this.apiUrl + this.profileEndPoint + '/' + id, profile);
  }

  deleteProfile(id: number, profile: ProfileModel){
    return this.httpClient.put(this.apiUrl + this.profileEndPoint + this.deleteProfileEndPoint + id, profile);
  }

  searchProfileKeyword(codeProfile: any) {
    return this.httpClient.post(this.apiUrl + this.profileEndPoint + this.findProfileEndPoint, codeProfile);
  }
}
