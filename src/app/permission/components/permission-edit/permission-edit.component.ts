import {Component, Input, OnInit} from '@angular/core';
import { PermissionModel } from '../../models/permission.model';
import { PermissionService } from '../../services/permission.service';
import { UpdatePermissionModel } from '../../models/updatePermission.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from "sweetalert2";

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {
  @Input() currentPermission: PermissionModel;
  submitted = false;
  isChecked = true;
  edit = false;
  write = false;
  delete = false;
  read = false;
  successApiMessage: string;
  errorApiMessage: string;
  Status: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
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
  constructor( private permissionService: PermissionService,
               private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.edit = this.currentPermission.edit;
    this.read = this.currentPermission.read;
    this.write = this.currentPermission.write;
    this.delete = this.currentPermission.delete;
  }

  EditPermission(idPermission: number) {
    const permission: UpdatePermissionModel = {
      id: idPermission
      , edit: this.edit
      , read: this.read
      , write: this.write
      , delete: this.delete
    };
    this.currentPermission.read = this.read;
    this.currentPermission.edit = this.edit;
    this.currentPermission.write = this.write;
    this.currentPermission.delete = this.delete;
    this.permissionService.updatePermission(idPermission, permission)
      .subscribe(data => {
        this.successApiMessage  = data.message;
        this.Status = Boolean(data.success);
        if (this.Status === true){
          this.Toast.fire({
            icon: 'success',
            title: data.message,
          });
        } else {
          this.Toast.fire({
            icon: 'error',
            title: data.message,
          });
        }
      }, error => {
        console.log(error);
      });
  }
}
