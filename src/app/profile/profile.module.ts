import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileCreateComponent} from './components/profile-create/profile-create.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {ProfileListComponent} from './components/profile-list/profile-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileRoutingModule} from './profile-routing.module';


@NgModule({
  declarations: [
    ProfileCreateComponent,
    ProfileEditComponent,
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
