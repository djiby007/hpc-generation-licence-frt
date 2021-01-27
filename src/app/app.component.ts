import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {UserModel} from './user/models/user.model';
import {PermissionModel} from './permission/models/permission.model';
import {AuthService} from './authentication/services/auth.service';
import {PermissionService} from './permission/services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hpc-user-management-ui';
  error = '';
  currentUser: UserModel;
  user: UserModel;
  permission: PermissionModel;
  listPermission: PermissionModel[];
  listConfiguration: PermissionModel[];

  constructor(private authService: AuthService, private userService: UserService,
              private router: Router,
              private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.authService.getUser(localStorage.getItem('username')).subscribe(value => {
        this.currentUser = value;
        this.user = value;
        console.log(this.user);
        this.getlistConfiguration();
        this.getlistPermission();
      }
    );
  }

  getlistConfiguration() {
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      this.permissionService.getListConfiguration(body).subscribe(data => {
        this.listConfiguration = [];
        this.listConfiguration = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listConfiguration.length; i++) {
          if (this.listConfiguration[i].feature.caption === 'Gestion des continents') {
            this.listConfiguration[i].rout = '/continent';
          }
          if (this.listConfiguration[i].feature.caption === 'Gestion des pays') {
            this.listConfiguration[i].rout = '/country';
          }
          if (this.listConfiguration[i].feature.caption === 'Gestion des villes') {
            this.listConfiguration[i].rout = '/city';
          }
          if (this.listConfiguration[i].feature.caption === 'Gestion des compagnies') {
            this.listConfiguration[i].rout = '/company';
          }
          if (this.listConfiguration[i].feature.caption === 'Gestion des utilisateurs') {
            this.listConfiguration[i].rout = '/user';
          }
        }
      });
    }
  }

  getlistPermission() {
    if (this.currentUser != null) {
      console.log(this.currentUser);
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      this.permissionService.getListPermission(body).subscribe(data => {
        this.listPermission = [];
        this.listPermission = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listPermission.length; i++) {
          if (this.listPermission[i].feature.caption === 'Gestion des profils') {
            this.listPermission[i].rout = '/profile';
          }
          if (this.listPermission[i].feature.caption === 'Gestion des fonctionalités') {
            this.listPermission[i].rout = '/feature';
          }
          if (this.listPermission[i].feature.caption === 'Gestion des permissions') {
            this.listPermission[i].rout = '/permission';
          }
        }
      });
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout(): void{
    this.authService.logout().subscribe(
      (data) => {
        this.router.navigateByUrl('/login');
      }
    );
  }
}
