import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserCreateComponent} from './components/user-create/user-create.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../utilities/app-material/app-material.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class UserModule { }
