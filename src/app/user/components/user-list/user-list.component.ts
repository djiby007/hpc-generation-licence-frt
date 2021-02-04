import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import Swal from 'sweetalert2';
import {HttpParams} from '@angular/common/http';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {PermissionModel} from "../../../permission/models/permission.model";
import {PermissionService} from "../../../permission/services/permission.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FilialeModel} from "../../../filiale/models/filiale.model";
import {FilialeCreateComponent} from "../../../filiale/components/filiale-create/filiale-create.component";
import {FilialeEditComponent} from "../../../filiale/components/filiale-edit/filiale-edit.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {UserCreateComponent} from "../user-create/user-create.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  listUser: MatTableDataSource<UserModel>;
  userForm: FormGroup;
  searchForm: FormGroup;
  listImportUser: UserModel[] = [];
  header = true;
  delete = false;
  edit = false;
  write = false;
  submitted = false;
  test: boolean;
  successMessage: string;
  editUserUrl = '/user/edit/';
  currentUser: UserModel;
  permission: PermissionModel;  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Columns: string[] = [ 'Civilité', 'Login', 'Prénom', 'Nom', 'Email', 'Profile', 'Filiale', 'Actions' ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router,
              private userService: UserService,
              private permissionService: PermissionService,
              private ngxCsvParser: NgxCsvParser,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

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
    this.getAllUser();
    this.createForm();
    this.createsearchForm();
    this.getWritePermission();
    this.getEditPermission();
    this.getDeletePermission();
  }

  createsearchForm(){
    this.searchForm = new FormGroup({
      code: new FormControl('', [
        Validators.required
      ])
    });
  }

  get code(){
    return this.searchForm.get('code');
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }

  getAllUser() {
    this.userService.getUser().subscribe(value => {
      this.listUser = new MatTableDataSource<UserModel>(value.data);
      this.listUser.sort = this.sort;
      this.listUser.paginator = this.paginator;
    });
  }

  get file(){
    return this.userForm.get('file');
  }

  createForm(){
    this.userForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
      this.listImportUser = result.map(value => {
        value.company = {id: value.company};
        value.profile = {id: value.profile};
        return value;
      });
      console.log(this.listImportUser);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  onSubmit() {
    this.userService.importUser(this.listImportUser).subscribe(
      (data) => {
        this.getAllUser();
        this.listImportUser = [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getWritePermission() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      let body = new HttpParams();
      body = body.set('idProfile', String(this.currentUser.profile.id));
      body = body.set('captionFeature', String('Gestion des utilisateurs'));
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
      body = body.set('captionFeature', String('Gestion des utilisateurs'));
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
      body = body.set('captionFeature', String('Gestion des utilisateurs'));
      this.permissionService.getDeletePermission(body).subscribe(data => {
        this.permission = data;
        if (this.permission !== null) {
          this.delete = true;
        }
      });
    }
  }


  applyFilterUser(filterValue: string) {
    this.listUser.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddUser() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(UserCreateComponent, dialogOption);
  }

  onEditUser(user: UserModel){
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.id = user.id + '';
    this.dialog.open(UserEditComponent, dialogOption);
  }

  onDeleteUser(user: UserModel){
    if (user.id) {
      Swal.fire({
        html: 'Voulez vous vraiment supprimer cette société ?',
        showCancelButton: true,
        confirmButtonText: `Supprimer`,
        confirmButtonColor: '#138f46',
        cancelButtonColor: '#2d7de0',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user).subscribe( data => {
            // @ts-ignore
            this.successMessage = data.message;
            this.Toast.fire({
              icon: 'success',
              title: this.successMessage,
            });
            this.getAllUser();
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

}
