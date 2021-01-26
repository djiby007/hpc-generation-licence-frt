import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionEditComponent} from './components/permission-edit/permission-edit.component';
import {PermissionListComponent} from './components/permission-list/permission-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PermissionRoutingModule} from './permission-routing.module';



@NgModule({
  declarations: [
    PermissionEditComponent,
    PermissionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }
