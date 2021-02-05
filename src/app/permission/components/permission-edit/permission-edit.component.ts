import {Component, Input, OnInit} from '@angular/core';
import { PermissionModel } from '../../models/permission.model';
import { PermissionService } from '../../services/permission.service';
import { UpdatePermissionModel } from '../../models/updatePermission.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        } else {
          this.errorApiMessage = data.message;
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }
      }, error => {
        console.log(error);
      });
  }
}
