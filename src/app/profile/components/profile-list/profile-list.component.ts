import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {HttpParams} from '@angular/common/http';
import {UserModel} from '../../../user/models/user.model';
import {PermissionModel} from '../../../permission/models/permission.model';
import {PermissionService} from '../../../permission/services/permission.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  listProfiles: {};
  searchProfileForm: FormGroup;
  submitted = false;
  successMessage: string;
  profileFined: any;
  editProfileUrl = '/profile/edit/';
  delete = false;
  edit = false;
  write = false;
  test: boolean;
  currentUser: UserModel;
  permission: PermissionModel;

  constructor(private profileService: ProfileService, private permissionService: PermissionService,
              private router: Router) {}

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  ngOnInit(): void {
    this.getProfile();
    this.createForm();
    this.getWritePermission();
    this.getEditPermission();
    this.getDeletePermission();
  }

  get code(){
    return this.searchProfileForm.get('code');
  }

  createForm(){
    this.searchProfileForm = new FormGroup({
      code: new FormControl('', Validators.required)
    });
  }

  getProfile(){
    this.profileService.getProfiles()
      .subscribe(data => {
        this.listProfiles = data;
        this.delete = false;
        this.test = true;
      }, error => {
        console.log(error);
      });
  }

  onSearchProfile(){
    const code = this.searchProfileForm.value;
    this.submitted = true;
    if (this.searchProfileForm.invalid) {
      this.getProfile();
      return;
    }
    if ((code) === '') {
      this.getProfile();
    } else {
      this.profileService.searchProfileKeyword(code)
        .subscribe(data => {
          this.listProfiles = data;
          this.profileFined = this.listProfiles;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  onEditProfile(p: ProfileModel) {
    this.router.navigateByUrl(this.editProfileUrl + (p.id));
  }

  onDeleteProfile(p: ProfileModel) {
    if (p.id) {
      Swal.fire({
        html: 'Voulez-vous vraiment supprimer ce profil?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.deleteProfile(p.id, p)
            .subscribe(data => {
              // @ts-ignore
              this.successMessage = data.message;
              this.Toast.fire({
                icon: 'success',
                title: this.successMessage,
              });
              this.getProfile();
            }, err => {
              console.log(err);
            });
        }
      });
    }
  }


  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }

  getWritePermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des profils'));
      this.permissionService.getWritePermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.write = true;
        }
      });
    }
  }

  getEditPermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des profils'));
      this.permissionService.getEditPermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.edit = true;
        }
      });
    }
  }

  getDeletePermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des profils'));
      this.permissionService.getDeletePermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.delete = true;
        }
      });
    }
  }
}
