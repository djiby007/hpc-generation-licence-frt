import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionEditComponent} from './components/permission-edit/permission-edit.component';
import {PermissionListComponent} from './components/permission-list/permission-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PermissionRoutingModule} from './permission-routing.module';
import {AppMaterialModule} from '../utilities/app-material/app-material.module';


@NgModule({
  declarations: [
    PermissionEditComponent,
    PermissionListComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PermissionRoutingModule,
        AppMaterialModule
    ],
    entryComponents: [ PermissionEditComponent ]
})
export class PermissionModule { }
