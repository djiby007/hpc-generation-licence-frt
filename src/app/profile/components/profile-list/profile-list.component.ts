import {Component, OnInit, ViewChild} from '@angular/core';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { HttpParams } from '@angular/common/http';
import { UserModel } from '../../../user/models/user.model';
import { PermissionModel } from '../../../permission/models/permission.model';
import { PermissionService } from '../../../permission/services/permission.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProfileCreateComponent } from '../profile-create/profile-create.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ConfirmationService } from '../../../utilities/confirmation/services/confirmation.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})

export class ProfileListComponent implements OnInit {
  listProfile: MatTableDataSource<ProfileModel>;
  profileColumns: string[] = [ 'Status', 'Code', 'Caption', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  successApiMessage: string;
  errorApiMessage: string;
  apiStatus: boolean;
  status: boolean;
  delete = false;
  edit = false;
  write = false;
  test: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  currentUser: UserModel;
  permission: PermissionModel;

  constructor(private profileService: ProfileService,
              private confirmServices: ConfirmationService,
              private permissionService: PermissionService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) {
    this.profileService.listen().subscribe( (p: any) => {
      this.refreshProfileList();
    });
  }

  ngOnInit(): void {
    this.refreshProfileList();
    this.getWritePermission();
    this.getEditPermission();
    this.getDeletePermission();
  }

  refreshProfileList(){
    this.profileService.getProfileList().subscribe(data => {
      this.listProfile = new MatTableDataSource<ProfileModel>(data);
      this.delete = false;
      this.test = true;
      this.listProfile.sort = this.sort;
      this.listProfile.paginator = this.paginator;
    });
  }

  onAddProfile() {
    const dialogProfile = new MatDialogConfig();
    dialogProfile.disableClose = true;
    dialogProfile.autoFocus = true;
    dialogProfile.width = '50%';
    dialogProfile.panelClass = ['background-dialog'];
    this.dialog.open(ProfileCreateComponent, dialogProfile);
  }

  applyFilterProfiles(filterValue: string) {
    this.listProfile.filter = filterValue.trim().toLocaleLowerCase();
  }

  onEditProfile(p: ProfileModel) {
    this.profileService.currentProfile = p;
    const dialogEditProfile = new MatDialogConfig();
    dialogEditProfile.disableClose = true;
    dialogEditProfile.autoFocus = true;
    dialogEditProfile.width = '50%';
    this.dialog.open(ProfileEditComponent, dialogEditProfile);
  }

  onDeleteProfile(profile: ProfileModel) {
    this.confirmServices.openConfirmDialog('Êtes-vous sûr de vouloir supprimer ce profil?')
      .afterClosed().subscribe(data => {
        if (data){
          if (profile.id) {
            this.profileService.deleteProfile(profile.id, profile).subscribe(resp => {
              this.successApiMessage = resp.message;
              this.apiStatus = Boolean(resp.success);
              if (this.apiStatus === true) {
                this.snackbar.open(this.successApiMessage.toString(), '', {
                  duration: 4000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  panelClass: ['green-snackbar']
                });
              } else {
                this.errorApiMessage = resp.message;
                this.snackbar.open(this.errorApiMessage.toString(), '', {
                  duration: 4000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  panelClass: ['green-snackbar']
                });
              }
              this.refreshProfileList();
            }, err => {
              console.log(err.message);
            });
          }
        }
    });
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
