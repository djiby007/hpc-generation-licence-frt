import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from 'src/app/profile/services/profile.service';
import {PermissionModel} from '../../models/permission.model';
import {PermissionService} from '../../services/permission.service';
import {Location} from '@angular/common';
import {UserModel} from '../../../user/models/user.model';
import {HttpParams} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {ProfileModel} from '../../../profile/models/profile.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  listPermissions: PermissionModel[];
  listPermits: MatTableDataSource<PermissionModel>;
  profiles: {};
  listProfileActives: MatTableDataSource<ProfileModel>;
  permissionColumns: string[] = [ 'Profile', 'Fonctionalité', 'Edit', 'Write', 'Read', 'Delete', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  test: boolean;
  featureCaption;
  checkMe = 'N';
  isChecked = true;
  canDelete = false;
  canEdit = false;
  canWrite = false;
  currentUser: UserModel;
  permission: PermissionModel;

  @Input() currentPermission: PermissionModel;
  submitted = false;
  edit = false;
  write = false;
  delete = false;
  read = false;

  constructor(private location: Location,
              private permissionService: PermissionService,
              private profileService: ProfileService ) {
  }

  ngOnInit(): void {
    this.getPermissions();
    this.getListPermissions();
    this.getWritePermission();
    this.getEditPermission();
    this.refreshProfileActiveList();
  }

  getListPermissions(){
    this.permissionService.getPermissionsList()
      .subscribe( data => {
        this.listPermits = new MatTableDataSource<PermissionModel>(data);
        this.listPermissions = data;
        this.test = false;
        this.listPermits.sort = this.sort;
        this.listPermits.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getPermissions(){
    this.permissionService.getPermissions()
      .subscribe( data => {
        this.listPermissions = data;
        // @ts-ignore
        this.listPermissions.sort = this.sort;
        // @ts-ignore
        this.listPermissions.paginator = this.paginator;
        this.test = false;
      }, error => {
        console.log(error);
      });
  }

  refreshProfileActiveList(){
    this.profileService.getActiveProfiles().subscribe(data => {
      this.listProfileActives = new MatTableDataSource<ProfileModel>(data);
    });
  }

  applyFilterProfiles(filterValue: string) {
    this.listProfileActives.filter = filterValue.trim().toLocaleLowerCase();
  }

  AlouerPermision(){
    this.permissionService.savePermission()
      .subscribe( res => {
        // @ts-ignore
        const message03 = res.message;
     /*   this.Toast.fire({
          icon: 'success',
          title: message03,
        });*/
        // this.getPermissions();
      }, error => {
      });
  }

/*  onChercheProfile(code: any){
    if ((code.code) === '') {
      Swal.fire('', 'Veuillez selectioner un profil!');
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
  }*/

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
