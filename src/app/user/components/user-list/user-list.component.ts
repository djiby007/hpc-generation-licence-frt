import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import Swal from 'sweetalert2';
import {HttpParams} from '@angular/common/http';
import {PermissionService} from '../../../permission/services/permission.service';
import {PermissionModel} from '../../../permission/models/permission.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  listUser: UserModel[];
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
  permission: PermissionModel;

  constructor(private router: Router,
              private userService: UserService,
              private permissionService: PermissionService,
              private ngxCsvParser: NgxCsvParser) {
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

  onSearch(){
    const code = this.code.value;
    this.submitted = true;
    if (this.searchForm.invalid) {
      this.getAllUser();
      return;
    }
    if ((code.trim()) === '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Rien à recherhcer!',
      });
      this.getAllUser();
    }else{
      this.userService.searchUserKeyword(code)
        .subscribe(data => {
          this.listUser = data;
          this.test = false;
        }, error => {
          console.log(error);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  onEditUser(user: UserModel){
    this.router.navigateByUrl(this.editUserUrl + (user.id));
  }

  onDeleteUser(user: UserModel){
   if (user.id) {
      Swal.fire({
        html: 'Voulez-vous vraiment supprimer cet utilisateur ?',
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

  getAllUser(){
    this.userService.getUser().subscribe(value => this.listUser = value.data);
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
}
