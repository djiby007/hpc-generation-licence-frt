import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from 'src/app/profile/services/profile.service';
import {PermissionModel} from '../../models/permission.model';
import {PermissionService} from '../../services/permission.service';
import {Location} from '@angular/common';
/*import Swal from 'sweetalert2';*/
import {UserModel} from '../../../user/models/user.model';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  listPermissions: {};
  profiles: {};
  test: boolean;
  currentPermission: PermissionModel;
  featureCaption;
  checkMe = 'N';
  isChecked = true;
  canDelete = false;
  canEdit = false;
  canWrite = false;
  currentUser: UserModel;
  permission: PermissionModel;

  constructor(private location: Location,
              private permissionService: PermissionService,
              private profileService: ProfileService,
              private router: Router) {
  }
/*  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });*/

  ngOnInit(): void {
    this.getPermissions();
    // this.getProfile();
    this.getWritePermission();
    this.getEditPermission();
  }

  getPermissions(){
    this.permissionService.getPermissions()
      .subscribe( data => {
        this.listPermissions = data;
        this.test = false;
      }, error => {
        console.log(error);
      });
  }

/*  getProfile(){
    this.profileService.getActiveProfiles()
      .subscribe( data => {
        this.profiles = data;
      }, error => {
      });
  }*/

  AlouerPermision(){
    this.permissionService.savePermission()
      .subscribe( res => {
        // @ts-ignore
        const message03 = res.message;
     /*   this.Toast.fire({
          icon: 'success',
          title: message03,
        });*/
        this.getPermissions();
      }, error => {
      });
  }

  onChercheProfile(code: any){
    if ((code.code) === '') {
/*
      Swal.fire('', 'Veuillez selectioner un profil!');
*/
      this.getPermissions();
    } else
    {
      this.permissionService.searchPermissionBykeyword(code.code)
        .subscribe(data => {
          this.listPermissions =  data;
          if (this.listPermissions === null) {
            this.test = true;
          }
        }, error => {
          console.log(error);
        });
    }
  }

  getWritePermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des permissions'));
      this.permissionService.getWritePermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.canWrite = true;
        }
      });
    }
  }

  getEditPermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des permissions'));
      this.permissionService.getEditPermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.canEdit = true;
        }
      });
    }
  }
}
