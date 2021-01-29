import {Component, Input, OnInit} from '@angular/core';
import { PermissionModel } from '../../models/permission.model';
import { PermissionService } from '../../services/permission.service';
import {UpdatePermissionModel} from '../../models/updatePermission.model';

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
  constructor( private permissionService: PermissionService ) { }

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
        console.log(data);
        // @ts-ignore
        const message02 = data.message;
      /*  this.Toast.fire({
          icon: 'success',
          title: message02,
        });*/
        // location.reload();
      }, error => {
        console.log(error);
      });
  }
}
