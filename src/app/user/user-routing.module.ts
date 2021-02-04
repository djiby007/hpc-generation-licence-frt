import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserCreateComponent} from './components/user-create/user-create.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'detail', component: UserDetailsComponent},
  {path: 'create', component: UserCreateComponent},
  {path: 'edit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
